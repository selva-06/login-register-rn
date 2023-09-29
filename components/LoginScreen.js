import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import db from '../DatabaseHelper.js';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
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
              navigation.navigate('Home', {user});
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

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch', 'contain', etc.
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  goToRegistrationContainer: {
    marginTop: 50,
  },
  error: {
    color: 'red',
  },
});

export default LoginScreen;
