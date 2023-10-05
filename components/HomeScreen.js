import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
  Alert,
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
import {homeStyles} from '../styles/ScreenStyles';

const HomeScreen = ({navigation}) => {
  const route = useRoute();
  const {user} = route.params;
  const [userDetails, setUserDetails] = useState(user); // Add this line
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserNameupdate, setNewUserNameupdate] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserEmailup, setNewUserEmailup] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPasswordup, setNewUserPasswordup] = useState('');
  const [newUserLastname, setNewUserLastname] = useState('');
  const [newUserLastnameup, setNewUserLastnameup] = useState('');
  const [newUserGender, setNewUserGender] = useState('');
  const [newUserGenderup, setNewUserGenderup] = useState('');
  const [newUserDob, setNewUserDob] = useState('');
  const [newUserDobup, setNewUserDobup] = useState('');
  const [newUserCheckboxChecked, setNewUserCheckboxChecked] = useState('');
  const [newUserCheckboxCheckedup, setNewUserCheckboxCheckedup] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Updated state name
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [firstNameErrorup, setFirstNameErrorup] = useState('');
  const [lastNameErrorup, setLastNameErrorup] = useState('');
  const [emailErrorup, setEmailErrorup] = useState('');
  const [passwordErrorup, setPasswordErrorup] = useState('');
  const [dateOfBirthErrorup, setDateOfBirthErrorup] = useState('');
  const [menumodalVisible, setmenuModalVisible] = useState(false);

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
        newUserNameupdate || userto.name,
        newUserEmailup || userto.email,
        newUserPasswordup || userto.password,
        newUserLastnameup || userto.lastname,
        newUserGenderup || userto.gender,
        newUserDobup || userto.dob,
        newUserCheckboxCheckedup ? 1 : 0, // Convert to 0 or 1
        results => {
          console.log('User updated successfully:', results);
          setNewUserNameupdate('');
          setNewUserEmailup('');
          setNewUserPasswordup('');
          setNewUserLastnameup('');
          setNewUserGenderup('');
          setNewUserDobup('');
          setNewUserCheckboxCheckedup('');
          setUpdateModalVisible(false);
          setUserDetails(prevUser => ({
            ...prevUser,
            name: newUserNameupdate || userto.name,
            email: newUserEmailup || userto.email,
            // Update other fields as needed
          }));
        },
        error => {
          console.error('Error updating user:', error);
        },
      );
    });
  };

  const handleDeleteUser = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const userId = user.id;

            await deleteUser(
              userId,
              async results => {
                console.log('User deleted successfully:', results);
                await AsyncStorage.removeItem('userData'); // Clear data from AsyncStorage
                navigation.navigate('Login');
              },
              error => {
                console.error('Error deleting user:', error);
              },
            );
          },
        },
      ],
      {cancelable: false},
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

  const validateFirstNameup = () => {
    if (!newUserNameupdate.trim()) {
      setFirstNameErrorup('First Name is required');
    } else {
      setFirstNameErrorup('');
    }
  };

  const validateLastNameup = () => {
    if (!newUserLastnameup.trim()) {
      setLastNameErrorup('Last Name is required');
    } else {
      setLastNameErrorup('');
    }
  };

  const validateEmailup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserEmailup.trim())) {
      setEmailErrorup('Please enter a valid email address');
    } else {
      setEmailErrorup('');
    }
  };

  const validatePasswordup = () => {
    const minLength = 8;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newUserPasswordup.length < minLength) {
      setPasswordErrorup(
        `Password must be at least ${minLength} characters long`,
      );
    } else if (!passwordRegex.test(newUserPasswordup)) {
      setPasswordErrorup(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      );
    } else {
      setPasswordError('');
    }
  };

  const validateDateOfBirthup = () => {
    if (!newUserDobup) {
      setDateOfBirthErrorup('Date of Birth is required');
    } else {
      setDateOfBirthErrorup('');
    }
  };

  const toggleModal = () => {
    setmenuModalVisible(!menumodalVisible);
  };
  const handleCrypto = () => {
    navigation.navigate('Crypto');
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={{color: 'black', fontSize: 30, paddingLeft: 15}}>☰</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={menumodalVisible}
          onRequestClose={toggleModal}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.menuItem}>
              <Text style={{color: 'white'}}>Hi click to close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Gender: {user.gender}</Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.linkText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttontouch}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttontouch}
          onPress={() => setUpdateModalVisible(true)}>
          <Text style={styles.buttonText}>Update User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttontouch} onPress={handleDeleteUser}>
          <Text style={styles.buttonText}>Delete User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttontouch} onPress={handleCrypto}>
          <Text style={styles.buttonText}> CryptoRates</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={updateModalVisible}
          onRequestClose={() => setUpdateModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="black"
              value={newUserNameupdate}
              onChangeText={setNewUserNameupdate}
              onBlur={validateFirstNameup}
            />
            <Text style={styles.error}>{firstNameErrorup}</Text>

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="black"
              value={newUserLastnameup}
              onChangeText={setNewUserLastnameup}
              onBlur={validateLastNameup}
            />
            <Text style={styles.error}>{lastNameErrorup}</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="black"
              value={newUserEmailup}
              onChangeText={setNewUserEmailup}
              onBlur={validateEmailup}
            />
            <Text style={styles.error}>{emailErrorup}</Text>

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry
              value={newUserPasswordup}
              onChangeText={setNewUserPasswordup}
              onBlur={validatePasswordup}
            />
            <Text style={styles.error}>{passwordErrorup}</Text>

            <Text style={styles.label}>Gender:</Text>
            <View>
              <RadioButton.Group
                onValueChange={setNewUserGenderup}
                value={newUserGenderup}>
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
              value={newUserDob ? newUserDobup.toString() : ''}
              onTouchStart={() => setShowDatePicker(true)}
              onBlur={validateDateOfBirthup}
            />
            <Text style={styles.error}>{dateOfBirthErrorup}</Text>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={newUserDobup || new Date()} // Updated value prop
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                isChecked={newUserCheckboxCheckedup}
                onPress={setNewUserCheckboxCheckedup}
              />
            </View>
            <Button title="Save Changes" onPress={handleUpdateUser} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setUpdateModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    </>
  );
};

const styles = homeStyles;

export default HomeScreen;
