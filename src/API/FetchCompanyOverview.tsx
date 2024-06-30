import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STOCK_API_KEY} from '../constants';
import {ToastAndroid} from 'react-native';

export const fetchCompanyOverview = async ({ticker}) => {
  const API_URL1 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${STOCK_API_KEY}`;
  const API_URL2 = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${STOCK_API_KEY}`;

  try {
    console.log('ticker============================>', ticker);
    const cachedData = await AsyncStorage.getItem(ticker);
    console.log('cahe:::::::::::::::::::::::::::::', cachedData);
    if (cachedData) {
      // Parse and return cached data if available
      return JSON.parse(cachedData);
    }

    // Fetch data from both APIs concurrently
    // const [response1, response2] = await Promise.all([
    //   axios.get(API_URL1),
    //   axios.get(API_URL2),
    // ]);

    // if (response1.status === 200 && response2.status === 200) {
    //   const data1 = response1.data;
    //   const data2 = response2.data;

    //   // Combine the data from both responses
    //   const combinedData = {
    //     ...data1,
    //     ...data2,
    //   };

    //   // Cache the combined data
    //   await AsyncStorage.setItem(ticker, JSON.stringify(combinedData));

    //   return combinedData;
    // }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    console.error('Error fetching stock data:', errorMessage);
  }

  return null;
};
