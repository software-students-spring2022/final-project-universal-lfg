import { Alert } from 'react-native';

export function nameValidator(name) {
    if (!name) {
        Alert.alert("Name can't be empty.")
        return "Name can't be empty."
    }
    return ''
}