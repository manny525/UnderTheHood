import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker } from 'react-native';
import inputStyle from '../styles/input';
import MainButton from './MainButton'
import colors from '../constants/colors';
import * as DocumentPicker from 'expo-document-picker';

const GoodsProviderValidation = (props) => {
    const [docName, setDocName] = useState('')

    const onDocChoose = () => {
        DocumentPicker.getDocumentAsync().then(result => {
            if (result.type === 'success') {
                setDocName(result.name)
            }
        })
    }

    return (
        <View style={styles.formContainer}>
            <Text>Electricity Bill</Text>
            <Text>{docName}</Text>
            <MainButton onPress={onDocChoose} style={{ paddingHorizontal: 15, paddingVertical: 8 }}>Choose</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    dropdown: {
        paddingHorizontal: Dimensions.get('window').width / 4
    },
    picker: {
    },
    onePicker: {
        height: 30,
        width: Dimensions.get('window').width * 0.6,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: colors.opaque
    },
    onePickerItem: {
        height: 44,
        color: 'red'
    },
    typeContainer: {
        flexDirection: 'row'
    }
})

export default GoodsProviderValidation