import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {fs, h} from '../../../../utils/util.style';

function DetailsHeader({
  companyName,
  symbol,
  assetType,
  exchange,
  currentPrice,
  changePercentage,
  gain,
}) {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.logo}
        source={require('../../../../assests/images/google.png')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Text style={styles.companyInfo}>
          {symbol} {assetType}
        </Text>
        <Text style={styles.companyInfo}>{exchange}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{currentPrice}</Text>
        <View style={styles.percentageContainer}>
          <Text style={styles.percentage(gain)}>{changePercentage}</Text>
          <Image
            resizeMode="contain"
            style={styles.triangle}
            source={
              gain === true
                ? require('../../../../assests/images/triangle.png')
                : require('../../../../assests/images/down.png')
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: h(12),
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: fs(16),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: fs(45),
    width: fs(45),
    marginRight: fs(10),
  },
  textContainer: {
    width: '70%',
  },
  companyName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: fs(14),
  },
  companyInfo: {
    fontWeight: 'normal',
    color: 'grey',
    fontSize: fs(10),
  },
  priceContainer: {
    flexDirection: 'column',
  },
  price: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: fs(16),
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: fs(6),
  },
  percentage: gain => ({
    fontSize: fs(12),
    fontWeight: 'bold',
    color: gain === true ? 'green' : 'red',
  }),
  triangle: {
    width: fs(12),
    height: fs(12),
  },
});

export default DetailsHeader;
