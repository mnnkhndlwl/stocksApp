import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import {fs} from '../utils/util.style';

// Screens
import TopGainersScreen from './screens/TopGainers';
import TopLosersScreen from './screens/TopLosers';
import DetailsScreen from './screens/Details';

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
        headerTitleStyle: {
          fontSize: fs(16),
          fontWeight: 'bold',
          color: 'black',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: route.name !== gain ? 'green' : 'red',
        tabBarLabelStyle: {
          fontSize: fs(12),
          fontWeight: 'bold',
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === loss) {
            return (
              <Image
                resizeMode="contain"
                style={{height: fs(24), width: fs(24), marginRight: fs(16)}}
                source={require('../assests/images/gain.png')}
              />
            );
          } else if (rn === gain) {
            return (
              <Image
                resizeMode="contain"
                style={{height: fs(24), width: fs(24), marginRight: fs(16)}}
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default MainContainer;
