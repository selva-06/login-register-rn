import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CustomCheckbox from './CustomCheckbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrationScreen = () => {
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
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = () => {
    if (!lastName) {
      setLastNameError('Last Name is required');
    } else {
      setLastNameError('');
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

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateDateOfBirth = () => {
    if (!dateOfBirth) {
      setDateOfBirthError('Date of Birth is required');
    } else {
      setDateOfBirthError('');
    }
  };

  const validateChecked = () => {
    if (!checked) {
      setCheckedError('*');
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
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          placeholderTextColor="black"
          value={dateOfBirth ? dateOfBirth.toDateString() : ''}
          onTouchStart={() => setShowDatePicker(true)}
        />
        <Text style={styles.error}>{dateOfBirthError}</Text>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    color: 'black',
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  datePickerText: {
    fontSize: 16,
    color: '#000',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  okButton: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    borderRadius: 5,
  },
  okButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  error: {
    color: 'red',
  },
});

export default RegistrationScreen;
