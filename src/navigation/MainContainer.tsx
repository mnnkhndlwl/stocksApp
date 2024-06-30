import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {fs} from '../utils/util.style';

// Screens
import TopGainersScreen from './screens/TopGainers/index';
import TopLosersScreen from './screens/TopLosers/index';
import DetailsScreen from './screens/Details/index';
import Search from './screens/Search';

// Screen names
const loss = 'Top-Gainers';
const gain = 'Top-Losers';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={loss}
      screenOptions={({route}) => ({
        headerTitle: 'Stocks App',
        headerTitleStyle: styles.headerTitle,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: route.name !== gain ? 'green' : 'red',
        tabBarLabelStyle: styles.labelStyle,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === loss) {
            return (
              <Image
                resizeMode="contain"
                style={styles.tabIcon}
                source={require('../assests/images/gain.png')}
              />
            );
          } else if (rn === gain) {
            return (
              <Image
                resizeMode="contain"
                style={styles.tabIcon}
                source={require('../assests/images/loss.png')}
              />
            );
          }

          // Default return (if route name doesn't match)
          return null;
        },
      })}>
      <Tab.Screen name={loss} component={TopGainersScreen} />
      <Tab.Screen name={gain} component={TopLosersScreen} />
    </Tab.Navigator>
  );
}

function MainContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({navigation}) => ({
          headerTitle: 'Details',
          headerTitleStyle: styles.headerStyle,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <View style={styles.searchContainer}>
                <Text style={styles.searchInput}> Search </Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainContainer;

const styles = StyleSheet.create({
  searchContainer: {
    marginRight: fs(10),
  },
  searchInput: {
    height: fs(25),
    width: fs(150),
    backgroundColor: 'white',
    borderRadius: fs(5),
    paddingHorizontal: fs(10),
    borderColor: 'black',
    borderWidth: fs(1),
    fontSize: fs(12),
    paddingVertical: fs(4),
  },
  headerStyle: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: 'black',
  },
  tabIcon: {height: fs(24), width: fs(24), marginRight: fs(16)},
  headerTitle: {fontSize: fs(16), fontWeight: 'bold', color: 'black'},
  labelStyle: {
    fontSize: fs(12),
    fontWeight: 'bold',
  },
});
