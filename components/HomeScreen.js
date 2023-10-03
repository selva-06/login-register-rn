import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const {user} = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Gender: {user.gender}</Text>

      {/* Add more user details as needed */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{color: 'blue'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
});

export default HomeScreen;
