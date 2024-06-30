import React from 'react';
import {View, Text, Button, ScrollView, Image, StyleSheet} from 'react-native';
import {fs, h, w} from '../../../utils/util.style';
import DetailsHeader from './components/DetailsHeader';
import StockChart from './components/StockChart';
import SwitchSelector from 'react-native-switch-selector';
import PriceStrip from './components/PriceStrip';
import Loader from '../../../components/Loader';
import {fetchCompanyOverview} from '../../../API/FetchCompanyOverview';
import Empty from '../../../components/Empty';
import {fetchHistoricalData} from '../../../API/FetchWeeklyData';

function DetailsScreen({navigation, route}) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [chart, setChartData] = React.useState({});
  const [stockPrices, setStockPrices] = React.useState([]);
  const [labels, setLabels] = React.useState([]);

  React.useEffect(() => {
    const loadStockData = async () => {
      console.log(
        'tickerDetails ========================',
        route?.params?.ticker,
      );
      const data = await fetchCompanyOverview({ticker: route?.params?.ticker});
      //  const data2 = await fetchHistoricalData({ticker: route?.params?.ticker});
      //setChartData(data2 || {}); // Ensure data2 is initialized correctly
      setData(data || []);
      setLoading(false);
    };

    loadStockData();
  }, []);

  // const filterDataByInterval = interval => {
  //   if (!chart || !chart['Weekly Time Series']) {
  //     return; // Handle case where chart data is not yet loaded or in expected format
  //   }

  //   const today = new Date();
  //   let fromDate;

  //   switch (interval) {
  //     case '1W':
  //       fromDate = new Date(
  //         today.getFullYear(),
  //         today.getMonth(),
  //         today.getDate() - 7,
  //       );
  //       break;
  //     case '1M':
  //       fromDate = new Date(
  //         today.getFullYear(),
  //         today.getMonth() - 1,
  //         today.getDate(),
  //       );
  //       break;
  //     case '3M':
  //       fromDate = new Date(
  //         today.getFullYear(),
  //         today.getMonth() - 3,
  //         today.getDate(),
  //       );
  //       break;
  //     case '6M':
  //       fromDate = new Date(
  //         today.getFullYear(),
  //         today.getMonth() - 6,
  //         today.getDate(),
  //       );
  //       break;
  //     case '1Y':
  //       fromDate = new Date(
  //         today.getFullYear() - 1,
  //         today.getMonth(),
  //         today.getDate(),
  //       );
  //       break;
  //     default:
  //       fromDate = new Date(
  //         today.getFullYear(),
  //         today.getMonth(),
  //         today.getDate() - 7,
  //       );
  //       break;
  //   }

  //   const filteredData = Object.keys(chart['Weekly Time Series'])
  //     .filter(date => new Date(date) >= fromDate)
  //     .reduce((obj, key) => {
  //       obj[key] = chart['Weekly Time Series'][key];
  //       return obj;
  //     }, {});

  //   const prices = Object.values(filteredData).map(entry =>
  //     parseFloat(entry['4. close']),
  //   );
  //   const dateLabels = Object.keys(filteredData).reverse(); // Reverse to show latest first

  //   setStockPrices(prices);
  //   setLabels(dateLabels);
  // };

  // React.useEffect(() => {
  //   if (chart && Object.keys(chart).length > 0) {
  //     filterDataByInterval('1W');
  //   }
  // }, [chart]);

  if (loading) {
    return <Loader />;
  }
  if (!data || Object.keys(data).length === 0) {
    return <Empty />;
  }
  if (data?.length === 0) {
    return <Empty />;
  } else {
    const globalQuote = data['Global Quote'];
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <DetailsHeader
          gain={route?.params?.gain}
          assetType={data?.AssetType}
          changePercentage={globalQuote['10. change percent']}
          companyName={data?.Name}
          currentPrice={globalQuote['05. price']}
          exchange={data?.Exchange}
          symbol={data?.Symbol}
        />
        <View style={styles.chartContainer}>
          <StockChart
            data={[100, 110, 105, 115, 120, 130, 125]}
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          />
        </View>
        <View
          style={{
            width: w(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SwitchSelector
            initial={0}
            onPress={value => {
              console.log(value);
            }}
            textColor={'#e26a00'}
            selectedColor={'white'}
            buttonColor={'#e26a00'}
            borderColor={'#e26a00'}
            hasPadding
            options={[
              {label: '1W', value: '1W'},
              {label: '1M', value: '1M'},
              {label: '3M', value: '3M'},
              {label: '6M', value: '6M'},
              {label: '1Y', value: '1Y'},
            ]}
            accessibilityLabel="interval-switch-selector"
          />
        </View>

        <View
          style={{
            borderRadius: fs(10),
            borderWidth: fs(2),
            marginVertical: fs(16),

            width: w(96),
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: fs(12),
              color: 'black',
              borderBottomColor: 'black',
              borderBottomWidth: fs(2),
              padding: fs(10),
            }}>
            About {route?.params?.ticker}
          </Text>
          <Text
            style={{
              padding: fs(10),
              fontWeight: 'normal',
              fontSize: fs(10),
              color: 'black',
              textAlign: 'justify',
              lineHeight: fs(16),
            }}>
            {data?.Description}
          </Text>
          <View
            style={{
              padding: fs(10),
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: fs(10),
            }}>
            <View
              style={{
                padding: fs(12),
                backgroundColor: '#e26a00',
                borderRadius: fs(50),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: fs(12),
                }}>
                Industry: {data?.Industry}
              </Text>
            </View>
            <View
              style={{
                padding: fs(12),
                backgroundColor: '#e26a00',
                borderRadius: fs(50),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: fs(12),
                }}>
                Sector: {data?.Sector}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: fs(10),
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: fs(4),
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: fs(12),
                  color: 'black',
                }}>
                52-Week-low
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: fs(12),
                  color: 'black',
                }}>
                $ {data['52WeekLow']}
              </Text>
            </View>
            <PriceStrip
              low={Number(data['52WeekLow'])}
              high={Number(data['52WeekHigh'])}
              current={globalQuote['05. price']}
            />
            <View
              style={{
                flexDirection: 'column',
                gap: fs(4),
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: fs(12),
                  color: 'black',
                }}>
                52-Week-High
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: fs(12),
                  color: 'black',
                }}>
                $ {data['52WeekHigh']}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              marginVertical: fs(10),
            }}>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                Market Cap
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                ${Number(data?.MarketCapitalization) / 1000000000000}T
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                PERatio
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                {data?.PERatio}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                Beta
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                {data?.Beta}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                BookValue
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                {data?.BookValue}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontWeight: 'normal',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                EPS
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: fs(12),
                }}>
                {data?.EPS}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({
  triangle: {
    width: fs(12),
    height: fs(12),
  },
  chartContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});
