import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Implement your sign in logic here
  };

  return (
    <ImageBackground
      source={require('C:/Users/018031/Model/assets/img.png')}
      style={styles.backgroundImage}>
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
    </ImageBackground>
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
});

export default LoginScreen;
