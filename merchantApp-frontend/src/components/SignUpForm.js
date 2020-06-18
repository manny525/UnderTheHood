import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, Text, Dimensions, Picker, KeyboardAvoidingViewBase } from 'react-native';
import inputStyle from '../styles/input';
import MainButton from './MainButton'
import colors from '../constants/colors';
import GeneralSignUp from './GeneralSignUp';
import GoodsProviderValidation from './GoodsProviderValidation';


const SignUpForm = (props) => {
    
    const onNext = (data) => {
        if (data.merchantType === 'goods') {
            setDisplay(<GoodsProviderValidation />)
        }
    }

    const [display, setDisplay] = useState(<GeneralSignUp onNext={onNext} />)

    return (
        <KeyboardAvoidingView>
            <View>
                <View style={styles.formContainer}><Text>Merchant Registration</Text></View>
                {display}
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
})

export default SignUpForm