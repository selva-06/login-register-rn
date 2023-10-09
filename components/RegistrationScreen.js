import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CustomCheckbox from './CustomCheckbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import {insertUser} from '../DatabaseHelper';
import {registerStyles} from '../styles/ScreenStyles';

const RegistrationScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Added dateOfBirth state
  const [checked, setChecked] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [checkedError, setCheckedError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Updated state name

  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError('First Name is required');
    } else if (/^\s+$/.test(firstName)) {
      setFirstNameError('First Name cannot be whitespace only');
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
    } else if (/^\s+$/.test(firstName)) {
      setLastNameError('First Name cannot be whitespace only');
    } else {
      setLastNameError('');
    }
  };

  const validateEmail = () => {
    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setEmailError('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrimmed)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
  };

  const validatePassword = () => {
    const passwordTrimmed = password.trim();
    if (!passwordTrimmed) {
      setPasswordError('Password is required');
    } else {
      const minLength = 8;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (passwordTrimmed.length < minLength) {
        setPasswordError(
          `Password must be at least ${minLength} characters long`,
        );
      } else if (!passwordRegex.test(passwordTrimmed)) {
        setPasswordError(
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        );
      } else {
        setPasswordError('');
      }
    }
  };

  const validateConfirmPassword = () => {
    const confirmPasswordTrimmed = confirmPassword.trim();
    if (!confirmPasswordTrimmed) {
      setConfirmPasswordError('Confirm Password is required');
    } else if (password !== confirmPasswordTrimmed) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateDateOfBirth = () => {
    if (!dateOfBirth) {
      setDateOfBirthError('Date of Birth is required');
    } else if (/^\s+$/.test(dateOfBirth)) {
      setDateOfBirthError('Date of Birth cannot be whitespace only');
    } else {
      setDateOfBirthError('');
    }
  };

  const validateChecked = () => {
    if (!checked) {
      setCheckedError('*');
    } else if (/^\s+$/.test(checked)) {
      setCheckedError('Checked field cannot be whitespace only');
    } else {
      setCheckedError('');
    }
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;

    setShowDatePicker(false);

    setDateOfBirth(currentDate);
  };

  const handleCheckboxToggle = () => {
    setChecked(!checked);
  };

  const handleRegister = () => {
    if (
      !firstName &&
      !lastName &&
      !email &&
      !password &&
      !confirmPassword &&
      !dateOfBirth &&
      !checked
    ) {
      setFirstNameError('First Name is required');
      setLastNameError('Last Name is required');
      setEmailError('Email is required');
      setPasswordError('Password is required');
      setConfirmPasswordError('Confirm Password is required');
      setDateOfBirthError('Date of Birth is required');
      setCheckedError('*');
      return; // Exit the function early if there are empty fields
    }
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateDateOfBirth();
    validateChecked();

    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !dateOfBirthError &&
      !checkedError
    ) {
      console.log('Registration details:', {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        checked,
        email,
      });
      insertUser(
        firstName,
        email,
        password,
        lastName,
        gender,
        dateOfBirth,
        checked, // Pass the checkbox value
        results => {
          console.log('User inserted successfully:', results);
        },
        error => {
          console.error('Error inserting user:', error);
        },
      );
      setFirstName('');
      setLastName('');
      setGender('male');
      setDateOfBirth('');
      setChecked(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
      setDateOfBirthError('');
      setCheckedError('');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/img.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="black"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          onBlur={validateFirstName}
        />
        <Text style={styles.error}>{firstNameError}</Text>

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="black"
          value={lastName}
          onChangeText={text => setLastName(text)}
          onBlur={validateLastName}
        />
        <Text style={styles.error}>{lastNameError}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail}
        />
        <Text style={styles.error}>{emailError}</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onBlur={validatePassword}
        />
        <Text style={styles.error}>{passwordError}</Text>

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={validateConfirmPassword}
        />
        <Text style={styles.error}>{confirmPasswordError}</Text>

        <Text style={styles.label}>Gender:</Text>
        <View>
          <RadioButton.Group
            onValueChange={newValue => setGender(newValue)}
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
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="black"
          value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
          onTouchStart={() => setShowDatePicker(true)}
        />
        <Text style={styles.error}>{dateOfBirthError}</Text>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            onValueChange={newValue => setDateOfBirth(newValue)}
            value={dateOfBirth ? dateOfBirth : new Date()} // Updated value prop
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.checkboxContainer}>
          <CustomCheckbox isChecked={checked} onPress={handleCheckboxToggle} />
          <Text style={styles.error}>{checkedError}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = registerStyles;

export default RegistrationScreen;
