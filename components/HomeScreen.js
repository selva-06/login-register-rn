import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {
  insertUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../DatabaseHelper';
import {RadioButton} from 'react-native-paper';
import CustomCheckbox from './CustomCheckbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const {user} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserLastname, setNewUserLastname] = useState('');
  const [newUserGender, setNewUserGender] = useState('');
  const [newUserDob, setNewUserDob] = useState('');
  const [newUserCheckboxChecked, setNewUserCheckboxChecked] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Updated state name
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCreateUser = () => {
    if (newUserName && newUserEmail && newUserPassword) {
      insertUser(
        newUserName,
        newUserEmail,
        newUserPassword,
        newUserDob,
        newUserLastname,
        newUserGender,
        newUserCheckboxChecked,
        results => {
          console.log('User inserted successfully:', results);
          setModalVisible(false);
        },
        error => {
          console.error('Error inserting user:', error);
        },
      );
    }
  };

  const handleUpdateUser = () => {
    const userId = user.id;
    console.log('user id is ', userId);
    getUserById(userId, result => {
      const userto = result.rows.item(0); // Assuming the query returns a single user
      updateUser(
        userId,
        newUserName || userto.name,
        newUserEmail || userto.email,
        newUserPassword || userto.password,
        newUserLastname || userto.lastname,
        newUserGender || userto.gender,
        newUserDob || userto.dob,
        newUserCheckboxChecked ? 1 : 0, // Convert to 0 or 1
        results => {
          console.log('User updated successfully:', results);
          setNewUserName('');
          setNewUserEmail('');
          setNewUserPassword('');
          setNewUserLastname('');
          setNewUserGender('');
          setNewUserDob('');
          setNewUserCheckboxChecked('');
        },
        error => {
          console.error('Error updating user:', error);
        },
      );
    });
  };

  const handleDeleteUser = () => {
    const userId = user.id;

    deleteUser(
      userId,
      results => {
        console.log('User deleted successfully:', results);
        navigation.navigate('Login');
      },
      error => {
        console.error('Error deleting user:', error);
      },
    );
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();

    setShowDatePicker(false);

    setNewUserDob(currentDate);
  };

  const validateFirstName = () => {
    if (!newUserName.trim()) {
      setFirstNameError('First Name is required');
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = () => {
    if (!newUserLastname.trim()) {
      setLastNameError('Last Name is required');
    } else {
      setLastNameError('');
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserEmail.trim())) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const minLength = 8;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newUserPassword.length < minLength) {
      setPasswordError(
        `Password must be at least ${minLength} characters long`,
      );
    } else if (!passwordRegex.test(newUserPassword)) {
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      );
    } else {
      setPasswordError('');
    }
  };

  const validateDateOfBirth = () => {
    if (!newUserDob) {
      setDateOfBirthError('Date of Birth is required');
    } else {
      setDateOfBirthError('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Gender: {user.gender}</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>

      <Button title="Create User" onPress={() => setModalVisible(true)} />
      <Button title="Update User" onPress={() => setUpdateMode(true)} />
      <Button title="Delete User" onPress={handleDeleteUser} />

      {updateMode && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="black"
            value={newUserName}
            onChangeText={setNewUserName}
            onBlur={validateFirstName}
          />
          <Text style={styles.error}>{firstNameError}</Text>

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="black"
            value={newUserLastname}
            onChangeText={setNewUserLastname}
            onBlur={validateLastName}
          />
          <Text style={styles.error}>{lastNameError}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={newUserEmail}
            onChangeText={setNewUserEmail}
            onBlur={validateEmail}
          />
          <Text style={styles.error}>{emailError}</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            value={newUserPassword}
            onChangeText={setNewUserPassword}
            onBlur={validatePassword}
          />
          <Text style={styles.error}>{passwordError}</Text>

          <Text style={styles.label}>Gender:</Text>
          <View>
            <RadioButton.Group
              onValueChange={setNewUserGender}
              value={newUserGender}>
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
            value={newUserDob ? newUserDob.toString() : ''}
            onTouchStart={() => setShowDatePicker(true)}
            onBlur={validateDateOfBirth}
          />
          <Text style={styles.error}>{dateOfBirthError}</Text>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={newUserDob || new Date()} // Updated value prop
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              isChecked={newUserCheckboxChecked}
              onPress={setNewUserCheckboxChecked}
            />
          </View>
          <Button title="Save Changes" onPress={handleUpdateUser} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUpdateMode(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="black"
            value={newUserName}
            onChangeText={setNewUserName}
            onBlur={validateFirstName}
          />
          <Text style={styles.error}>{firstNameError}</Text>

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="black"
            value={newUserLastname}
            onChangeText={setNewUserLastname}
            onBlur={validateLastName}
          />
          <Text style={styles.error}>{lastNameError}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={newUserEmail}
            onChangeText={setNewUserEmail}
            onBlur={validateEmail}
          />
          <Text style={styles.error}>{emailError}</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            value={newUserPassword}
            onChangeText={setNewUserPassword}
            onBlur={validatePassword}
          />
          <Text style={styles.error}>{passwordError}</Text>

          <Text style={styles.label}>Gender:</Text>
          <View>
            <RadioButton.Group
              onValueChange={setNewUserGender}
              value={newUserGender}>
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
            value={newUserDob ? newUserDob.toString() : ''}
            onTouchStart={() => setShowDatePicker(true)}
            onBlur={validateDateOfBirth}
          />
          <Text style={styles.error}>{dateOfBirthError}</Text>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={newUserDob || new Date()} // Updated value prop
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              isChecked={newUserCheckboxChecked}
              onPress={setNewUserCheckboxChecked}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
            <Text style={styles.buttonText}>Create User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    color: 'black',
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
  label: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
