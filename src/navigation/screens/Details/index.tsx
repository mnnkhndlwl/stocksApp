import React from 'react';
import {View, Text, Button, ScrollView, Image, StyleSheet} from 'react-native';
import {fs, h, w} from '../../../utils/util.style';
import DetailsHeader from './components/DetailsHeader';
import StockChart from './components/StockChart';
import SwitchSelector from 'react-native-switch-selector';
import PriceStrip from './components/PriceStrip';

function DetailsScreen({navigation}) {
  const stockPrices = [100, 110, 105, 115, 120, 130, 125];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <DetailsHeader />
      <View style={styles.chartContainer}>
        <StockChart data={stockPrices} labels={labels} />
      </View>
      <View
        style={{
          width: w(40),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SwitchSelector
          initial={0}
          onPress={() => {}}
          textColor={'#e26a00'}
          selectedColor={'white'}
          buttonColor={'#e26a00'}
          borderColor={'#e26a00'}
          hasPadding
          options={[
            {label: '1D', value: '1D'},
            {label: '1W', value: '1W'},
            {label: '1M', value: '1M'},
            {label: '3M', value: '3M'},
            {label: '6M', value: '6M'},
            {label: '1Y', value: '1Y'},
          ]}
          accessibilityLabel="gender-switch-selector"
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
          About Apple INC
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
          Apple Inc. is an American multinational corporation and technology
          company headquartered in Cupertino, California, in Silicon Valley. It
          designs, develops, and sells consumer electronics, computer software,
          and online services. Devices include the iPhone, iPad, Mac, Apple
          Watch, Vision Pro, and Apple TV; operating systems include iOS,
          iPadOS, and macOS; and software applications and services include
          iTunes, iCloud, Apple Music, and Apple TV+. Since 2011, Apple has been
          the world's largest company by market capitalization except when
          Microsoft held the position between January and June 2024. In 2022,
          Apple was the largest technology company by revenue, with US$394.3
          billion.[9][failed verification] As of 2023, Apple was the
          fourth-largest personal computer vendor by unit sales,[10] the largest
          manufacturing company by revenue, and the largest vendor of mobile
          phones in the world.[11] It is one of the Big Five American
          information technology companies, alongside Alphabet (the parent
          company of Google), Amazon, Meta (the parent company of Facebook), and
          Microsoft.
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
              Industry: Electronics
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
              $123
            </Text>
          </View>
          <PriceStrip low={127} high={177} current={140} />
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
              $157
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
              $2.77T
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
              Market Cap
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: fs(12),
              }}>
              $2.77T
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
              Market Cap
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: fs(12),
              }}>
              $2.77T
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
              Market Cap
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: fs(12),
              }}>
              $2.77T
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
              Market Cap
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: fs(12),
              }}>
              $2.77T
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
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
