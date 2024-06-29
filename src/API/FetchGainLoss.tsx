import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STOCK_API_KEY} from '../constants';

const API_URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${STOCK_API_KEY}`;
const CACHE_KEY = 'stock_data_cache';

export const fetchGainLoss = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);

    if (cachedData) {
      // Parse and return cached data if available
      // console.log('cachedData===================>', cachedData);
      return JSON.parse(cachedData);
    }

    // const response = await axios.get(API_URL);

    // if (response.status === 200) {
    //   const data = response.data;

    //   // Cache the data
    //   await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
    //   console.log(data);
    //   return data;
    // }
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }

  return null;
};
