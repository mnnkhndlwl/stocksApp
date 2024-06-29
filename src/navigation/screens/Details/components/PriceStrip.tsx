import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fs, h, w} from '../../../../utils/util.style';

const PriceStrip = ({low, high, current}) => {
  // Calculate the percentage position of the current price
  const percentage = ((current - low) / (high - low)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        <View style={[styles.arrowContainer, {left: `${percentage}%`}]}>
          <Text style={styles.arrow}>▲</Text>
          <Text style={styles.price}>$ {current}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  strip: {
    width: w(45),
    height: fs(5),
    backgroundColor: '#e26a00',
    borderRadius: 5,
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    top: -2,
    alignItems: 'center',
  },
  arrow: {
    color: 'red',
    fontSize: fs(12),
  },
  price: {
    marginTop: 5,
    fontSize: fs(12),
    color: 'black',
  },
  labelsContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PriceStrip;
