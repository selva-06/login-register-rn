import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './navigation/Navigation';

const App = () => {
  // const [initialRoute, setInitialRoute] = useState('Login');

  // useEffect(() => {
  //   // Check if user is logged in from local storage
  //   AsyncStorage.getItem('userData')
  //     .then(data => {
  //       if (data) {
  //         setInitialRoute('Home');
  //         if (data !== null) {
  //           // Data is stored in AsyncStorage
  //           console.log('User async data found:', JSON.parse(data));
  //         } else {
  //           // Data is not found in AsyncStorage
  //           console.log('User data not found');
  //         }
  //       }
  //     })
  //     .catch(error =>
  //       console.error('Error reading data from local storage:', error),
  //     );
  // }, []);

  return <Navigation />;
};

export default App;
