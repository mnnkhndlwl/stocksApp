import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {STOCK_API_KEY} from '../constants';
import {ToastAndroid} from 'react-native/Libraries/Components/ToastAndroid/ToastAndroid';

export const fetchHistoricalData = async ({ticker}) => {
  const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${ticker}&apikey=${STOCK_API_KEY}`;

  try {
    const cachedData = await AsyncStorage.getItem(`${ticker}-chart`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const response = await axios.get(API_URL);
    if (response.status === 200) {
      if (response.data['Error Message']) {
        const errorMessage = response.data['Error Message'];
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.error('API error:', errorMessage);
        return null;
      }
      const data = response.data['Weekly Time Series'];
      await AsyncStorage.setItem(`${ticker}-chart`, JSON.stringify(data));
      return data;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    console.error('Error fetching stock data:', errorMessage);
  }

  return null;
};
