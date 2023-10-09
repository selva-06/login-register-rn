import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import db from '../DatabaseHelper.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginStyles} from '../styles/ScreenStyles.js';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = async () => {
    if (!email && !password) {
      setEmailError('invalid email');
      setPasswordError('invlalid password');
      return;
    }
    validateEmail();
    validatePassword();
    if (!emailError && !passwordError) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ? AND password = ?',
          [email, password],
          (_, {rows}) => {
            if (rows.length > 0) {
              const user = rows.item(0);
              console.log('User authenticated');
              AsyncStorage.setItem('userData', JSON.stringify(user));
              console.log('User data stored in AsyncStorage:', user);
              navigation.navigate('Main', {user});
            } else {
              setEmailError('Invalid email or password');
              setPasswordError('Invalid email or password');
            }
          },
          (_, error) => {
            console.log('Error querying database: ', error);
          },
        );
      });
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const minLength = 8;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < minLength) {
      setPasswordError(
        `Password must be at least ${minLength} characters long`,
      );
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      );
    } else {
      setPasswordError('');
    }
  };
  const styles = loginStyles;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        color="black"
        placeholderTextColor="black" // Set text color to black
        onBlur={validateEmail}
      />
      <Text style={styles.error}>{emailError}</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="black"
        color="black" // Set text color to black
        onBlur={validatePassword}
      />
      <Text style={styles.error}>{passwordError}</Text>
      <View style={styles.goToRegistrationContainer}>
        <Button title="Sign In" onPress={handleSignIn} />
        <View style={styles.goToRegistrationContainer}>
          <Button
            title="Go to Registration"
            onPress={() => navigation.navigate('Registration')}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
