import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import {fetchSearchResults} from '../../../API/FetchSearchResults';
import {fs, w} from '../../../utils/util.style';
import {SearchCard} from './components/SearchCard';

const Search = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const cachedData = await AsyncStorage.getItem('search_history');
      if (cachedData) {
        setHistory(JSON.parse(cachedData));
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      ToastAndroid.show('Please enter a search keyword', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const data = await fetchSearchResults({query: searchQuery});
    setResults(data?.bestMatches);
    console.log(data);
    setLoading(false);
  };

  const handleSelect = async item => {
    const newHistory = [
      item,
      ...history.filter(i => i['1. symbol'] !== item['1. symbol']),
    ];
    setHistory(newHistory);
    await AsyncStorage.setItem('search_history', JSON.stringify(newHistory));
    navigation.navigate('Details', {
      ticker: item['1. symbol'],
      gain: true,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={results.length > 0 ? results : history}
        keyExtractor={item => item['1. symbol']}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <SearchCard
              isHistory={results.length === 0}
              name={item['2. name']}
              symbol={item['1. symbol']}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    padding: fs(10),
  },
  searchInput: {
    height: fs(45),
    width: w(95),
    backgroundColor: 'white',
    borderRadius: fs(5),
    paddingHorizontal: fs(10),
    borderColor: 'black',
    borderWidth: fs(1),
    marginBottom: fs(10),
  },
});
