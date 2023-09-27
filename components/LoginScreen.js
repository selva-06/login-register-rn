import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Implement your sign in logic here
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
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="black"
        color="black" // Set text color to black
      />
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
    marginTop: 50, // Add 50 units of space between the "Sign In" button and "Go to Registration" button
  },
});

export default LoginScreen;
