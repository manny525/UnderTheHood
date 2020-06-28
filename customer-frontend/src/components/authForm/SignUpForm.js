import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, Text, Dimensions, Picker, KeyboardAvoidingViewBase } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import CustomerSignUp from './CustomerSIgnUp';

const SignUpForm = (props) => {
    return (
        <View style={styles.formContainer}>
            <Text>Merchant Registration</Text>
            <CustomerSignUp email={props.email} setLogin={setLogin} />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
})

export default SignUpForm