import {StyleSheet} from 'react-native';

export const loginStyles = StyleSheet.create({
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
export const registerStyles = StyleSheet.create({
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

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'top',
    // alignItems: 'center',
    // padding: 20,
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    marginLeft: 30,
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
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
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontouch: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 100,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalView: {
    position: 'absolute',
    backgroundColor: 'grey',
    top: 0,
    left: 0,
    height: '100%',
    width: 200, // Adjust the width as needed
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export const cryptoStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rate: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
});
