import AsyncStorage from '@react-native-async-storage/async-storage';

export const cleanUpExpiredCache = async () => {
  const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours
  try {
    const keys = await AsyncStorage.getAllKeys();
    const currentTime = new Date().getTime();

    const expiredKeys = [];
    for (const key of keys) {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);
        if (
          parsedItem.timestamp &&
          currentTime - parsedItem.timestamp > CACHE_EXPIRY_MS
        ) {
          expiredKeys.push(key);
        }
      }
    }

    if (expiredKeys.length > 0) {
      await AsyncStorage.multiRemove(expiredKeys);
      console.log(`Removed expired cache entries: ${expiredKeys}`);
    }
  } catch (error) {
    console.error('Error cleaning up expired cache:', error);
  }
};
