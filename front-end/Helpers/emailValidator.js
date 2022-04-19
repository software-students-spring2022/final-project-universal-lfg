import { Alert } from 'react-native';

export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/
    if (!email) {
      Alert.alert("Email can't be empty.")
      return "Email can't be empty."
    }
    if (!re.test(email)) {
      Alert.alert('Oops! We need a valid email address.')
      return 'Oops! We need a valid email address.'
    }
    return ''
  }