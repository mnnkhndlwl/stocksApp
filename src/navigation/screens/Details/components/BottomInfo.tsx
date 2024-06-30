import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fs} from '../../../../utils/util.style';

const BottomInfo = ({info, value}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.valueContainer}>{info}</Text>
      <Text style={styles.valueContainer}>{value}</Text>
    </View>
  );
};

export default BottomInfo;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'column',
  },
  valueContainer: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: fs(12),
  },
});
