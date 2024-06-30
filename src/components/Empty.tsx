import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fs} from '../utils/util.style';

const Empty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data available</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: 'gray',
  },
});
