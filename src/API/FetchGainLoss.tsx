import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STOCK_API_KEY} from '../constants';
import {ToastAndroid} from 'react-native';

const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${STOCK_API_KEY}`;
const CACHE_KEY = 'stock_data_cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export const fetchGainLoss = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();

      // Check if cache is still valid
      if (currentTime - parsedData.timestamp < CACHE_EXPIRY_MS) {
        return parsedData.data;
      }
    }

    const response = await axios.get(API_URL);

    if (response.status === 200) {
      const data = response.data;
      if (data['Error Message']) {
        const errorMessage = data['Error Message'];
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.error('API error:', errorMessage);
        return null;
      }

      // Cache the data with a timestamp
      const cacheEntry = {
        data: data,
        timestamp: new Date().getTime(),
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
      return data;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    console.error('Error fetching stock data:', errorMessage);
  }

  return null;
};
