import * as React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {fs, h, w} from '../../../utils/util.style';
import {fetchGainLoss} from '../../../API/FetchGainLoss';

export default function TopGainersScreen({navigation}) {
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadStockData = async () => {
      const data = await fetchGainLoss();
      setData(data?.top_gainers);
      setLoading(false);
    };

    loadStockData();
  }, []);
  if (!data?.map) {
    return <></>;
  } else
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data?.map(StockData => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <View style={styles.card}>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={require('../../../assests/images/google.png')}
                />
                <Text style={styles.tittleText}>{StockData?.ticker}</Text>
                <Text style={styles.text}>$ {StockData?.price} </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: fs(6),
                  }}>
                  <Text
                    style={{
                      fontSize: fs(12),
                      fontWeight: 'bold',
                      color: 'green',
                    }}>
                    {StockData?.change_percentage}
                  </Text>
                  <Image
                    resizeMode="contain"
                    style={styles.triangle}
                    source={require('../../../assests/images/triangle.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: fs(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: fs(10),
    justifyContent: 'center',
  },
  card: {
    height: h(20),
    width: w(45),
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: fs(10),
    borderRadius: fs(10),
    borderColor: 'black',
    borderWidth: fs(2),
  },
  image: {
    height: fs(24),
    width: fs(24),
    marginRight: fs(16),
    marginBottom: fs(10),
  },
  tittleText: {
    fontWeight: 'bold',
    fontSize: fs(16),
    color: 'black',
    height: fs(40),
  },
  text: {
    fontWeight: 'bold',
    fontSize: fs(16),
    color: 'black',
  },
  triangle: {
    width: fs(12),
    height: fs(12),
  },
});