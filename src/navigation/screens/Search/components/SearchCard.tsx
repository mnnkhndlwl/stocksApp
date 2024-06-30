import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {fs, w} from '../../../../utils/util.style';

export const SearchCard = ({isHistory, name, symbol}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{symbol}</Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      {isHistory && (
        <Image
          style={styles.historyIcon}
          source={require('../../../../assests/images/history.png')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: fs(10),
    backgroundColor: 'white',
    borderRadius: fs(10),
    borderWidth: fs(1),
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: fs(10),
  },
  text: {
    fontSize: fs(10),
    fontWeight: 'normal',
    color: 'black',
  },
  historyIcon: {
    height: fs(24),
    width: fs(24),
  },
  textContainer: {flexDirection: 'column', gap: fs(6)},
});
