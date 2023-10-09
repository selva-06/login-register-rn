import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import CryptoList from '../components/CryptoList';
import HomeIcon from '../assets/Bitcoin.jpg'; // Replace with the actual path to your icon
import ProfileIcon from '../assets/profile.png'; // Replace with the actual path to your icon
import {Image} from 'react-native'; // Import Image from react-native

const Tab = createBottomTabNavigator();

const Drawer = ({route}) => {
  const {user} = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={CryptoList}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? HomeIcon : HomeIcon}
              style={{width: 25, height: 25}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? ProfileIcon : ProfileIcon}
              style={{width: 25, height: 25}}
            />
          ),
        }}>
        {props => <HomeScreen {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Drawer;
