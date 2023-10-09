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
    backgroundColor: 'skyblue',
  },
  headText: {
    color: 'black',
    fontSize: 30,
    marginBottom: 10,
  },
  // input: {
  //   height: 40,
  //   width: '100%',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   marginBottom: 12,
  //   paddingLeft: 8,
  // },
  input: {
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 10,
    borderRadius: 30,
    width: '80%',
    height: 50,
    borderColor: '#dadae8',
    paddingBottom: 10,
    marginBottom: 10,
  },
  image: {
    marginTop: 10,
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 50,
  },
  goToRegistrationContainer: {
    marginTop: 50,
  },
  error: {
    color: 'red',
  },
  loginbtn: {
    backgroundColor: 'purple',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    width: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    paddingVertical: 0,
    fontSize: 16,
  },
});
export const registerStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'skyblue',
  },
  head: {
    height: 40,
    paddingLeft: 8,
    color: 'black',
    fontSize: 20,
    marginLeft: 60,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 7,
    borderRadius: 25,
    width: '100%',
    height: 45,
    borderColor: '#dadae8',
    paddingBottom: 10,
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
    backgroundColor: 'purple',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 112,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    width: 100,
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
    backgroundColor: 'skyblue',
  },
  headingtext: {
    fontSize: 25,
    color: 'black',
    marginLeft: 70,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  detailstext: {
    fontSize: 20,
    color: 'black',
    marginLeft: 20,
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 10, // Adjust as needed
  },
  imageButton: {
    marginLeft: 10,
    marginTop: 0, // Adjust as needed
  },
  buttonImage: {
    width: 30, // Set the width of the image
    height: 30, // Set the height of the image
  },
  datalist: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    marginLeft: 20,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 30,
    marginTop: 40,
  },
  delete: {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 30,
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
  textabove: {
    width: '100%',
    height: 40,
    paddingLeft: 8,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,
    paddingBottom: 0,
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
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    bottom: 50,
    maxHeight: '80%', // Adjust this value as needed
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Use a semi-transparent background color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 50,
    flex: 1,
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    maxHeight: '80%', // Set a maximum height for the modal
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: 'blue', // Adjust the color as needed
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
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
  menuIcon: {
    color: 'black',
    fontSize: 30,
    paddingLeft: 15,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 50,
    paddingLeft: 10,
  },
  menuItem: {
    paddingBottom: 20,
  },
  menuText: {
    color: 'white',
    fontSize: 18,
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
