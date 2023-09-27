import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {RadioButton, Checkbox} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedDate, setSelectedDate] = useState('');
  const [checked, setChecked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = day => {
    setSelectedDate(day.dateString);
  };

  const handleRegister = () => {
    console.log('Registration details:', {
      firstName,
      lastName,
      gender,
      selectedDate,
      checked,
    });
  };

  const handleOkPress = () => {
    setShowCalendar(false);
  };

  return (
    <ImageBackground
      source={require('C:/Users/018031/Model/assets/img.png')}
      style={styles.backgroundImage}>
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
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowCalendar(true)}>
          <Text style={styles.datePickerText}>
            {selectedDate ? selectedDate : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>
        {showCalendar && (
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{[selectedDate]: {selected: true}}}
              style={styles.calendar}
              theme={{
                backgroundColor: '#ffffff', // Set calendar background color
              }}
            />
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}

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
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch', 'contain', etc.
  },
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginTop: 12,
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
    marginBottom: 20,
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
    marginTop: 1, // Adjust the position of the "OK" button
  },
  okButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default RegistrationScreen;
