import React,{ Component} from 'react';
import {Router,Scene,Stack} from 'react-native-router-flux';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import VerificationCode from '../pages/VerificationCode';
import Home from '../screens/Home';
import  MyCart from '../screens/MyCart';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true}>
                <Scene key="login" component={Login} title="Login" initial={true}/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                <Scene key='verificationCode' component={VerificationCode} title="code Verification"/>
                <Scene key='home' component={Home} title='Home Page' type='reset'/>
                <Scene key='mycart' component={MyCart} title='Cart'/>
                </Stack>
            </Router>
        );
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}