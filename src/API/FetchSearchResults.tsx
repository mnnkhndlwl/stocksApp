import axios from 'axios';
import {STOCK_API_KEY} from '../constants';
import {ToastAndroid} from 'react-native';

export const fetchSearchResults = async ({query}) => {
  const API_URL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=${STOCK_API_KEY}`;

  try {
    const response = await axios.get(`${API_URL}&keywords=${query}`);
    console.log('reposnesearch', response?.data);
    if (response.data.bestMatches) {
      return response?.data;
    } else {
      ToastAndroid.show('No results found', ToastAndroid.SHORT);
      return null;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    console.error('Error fetching stock data:', errorMessage);
  }

  return [];
};
