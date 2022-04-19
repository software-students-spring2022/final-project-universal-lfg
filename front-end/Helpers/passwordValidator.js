import { Alert } from 'react-native';

export function passwordValidator(password) {
    if (!password) {
      Alert.alert("Password can't be empty.")
      return "Password can't be empty."
    }
    if (password.length < 5) {
      Alert.alert('Password must be at least 5 characters long.')
      return 'Password must be at least 5 characters long.'
    }
    return ''
  }