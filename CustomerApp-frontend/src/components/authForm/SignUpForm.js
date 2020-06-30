import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomerSignUp from './CustomerSIgnUp';

const SignUpForm = (props) => {
    return (
        <View style={styles.formContainer}>
            <Text>Customer Registration</Text>
            <CustomerSignUp email={props.email} setLogin={props.setLogin} />
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