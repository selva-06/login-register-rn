import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RadioButton, Checkbox} from 'react-native-paper';

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [checked, setChecked] = useState(false);

  const handleRegister = () => {
    console.log('Registration details:', {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      checked,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="black"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="black"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.radioGroup}>
        <RadioButton.Group
          onValueChange={value => setGender(value)}
          value={gender}>
          <View style={styles.radioButton}>
            <Text style={styles.radioLabel}>Male</Text>
            <RadioButton value="male" color="#000" />
          </View>
          <View style={styles.radioButton}>
            <Text style={styles.radioLabel}>Female</Text>
            <RadioButton value="female" color="#000" />
          </View>
        </RadioButton.Group>
      </View>
      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="black"
        value={dateOfBirth}
        onChangeText={text => setDateOfBirth(text)}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color="red"
          uncheckColor="black"
        />
        <Text style={styles.checkboxLabel}>
          I accept the terms and conditions
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  radioGroup: {
    marginBottom: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: 'black',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default RegistrationScreen;
