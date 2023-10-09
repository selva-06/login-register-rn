import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import CryptoList from '../components/CryptoList';

const Tab = createBottomTabNavigator();

const Drawer = ({route}) => {
  const {user} = route.params;
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen name="CryptoList" component={CryptoList} />
    </Tab.Navigator>
  );
};

export default Drawer;
