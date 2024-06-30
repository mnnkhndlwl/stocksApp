import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STOCK_API_KEY} from '../constants';
import {ToastAndroid} from 'react-native';

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const fetchCompanyOverview = async ({ticker}) => {
  const API_URL1 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${STOCK_API_KEY}`;
  const API_URL2 = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${STOCK_API_KEY}`;

  try {
    console.log('ticker============================>', ticker);
    const cachedData = await AsyncStorage.getItem(ticker);
    console.log('cache:::::::::::::::::::::::::::::', cachedData);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();

      // Check if cache is still valid
      if (currentTime - parsedData.timestamp < CACHE_EXPIRY_MS) {
        return parsedData.data;
      }
    }

    // Fetch data from both APIs concurrently
    const [response1, response2] = await Promise.all([
      axios.get(API_URL1),
      axios.get(API_URL2),
    ]);

    if (response1.status === 200 && response2.status === 200) {
      const data1 = response1.data;
      const data2 = response2.data;

      if (response1.data['Error Message']) {
        const errorMessage = response1.data['Error Message'];
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.error('API error:', errorMessage);
        return null;
      }

      if (response2.data['Error Message']) {
        const errorMessage = response2.data['Error Message'];
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.error('API error:', errorMessage);
        return null;
      }

      // Combine the data from both responses
      const combinedData = {
        ...data1,
        ...data2,
      };

      // Cache the combined data with a timestamp
      const cacheEntry = {
        data: combinedData,
        timestamp: new Date().getTime(),
      };
      await AsyncStorage.setItem(ticker, JSON.stringify(cacheEntry));

      return combinedData;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    console.error('Error fetching stock data:', errorMessage);
  }

  return null;
};
