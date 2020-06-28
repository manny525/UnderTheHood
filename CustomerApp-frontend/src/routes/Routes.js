// import React,{ Component} from 'react';
// import {Router,Scene,Stack} from 'react-native-router-flux';

// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import VerificationCode from '../pages/VerificationCode';
// import Home from '../screens/Home';
// import  MyCart from '../screens/MyCart';
// import Rewards from '../screens/Rewards';
// import MyCard from '../screens/MyCard';
// import addnewcard from '../pages/AddNewCard';

// // export default class Routes extends Component {
// //     render() {
// //         return (
// //             <Router>
// //                 <Stack key="root" hideNavBar={true}>
// //                     <Scene key="login" component={Login} title="Login"  initial={true}/>
// //                     <Scene key="signup" component={Signup} title="Sign up"/>
// //                     <Scene key='verificationCode' component={VerificationCode} title="code Verification" />
// //                     <Scene key='home' component={Home} title='Home Page' type='reset'  navigationBarStyle={styles.tabBar}/>
// //                     <Scene key='mycart' component={MyCart} title='Cart' navigationBarStyle={styles.tabBar}/>
// //                     <Scene key='mycard' component={MyCard} title='My Card' navigationBarStyle={styles.tabBar}/>
// //                     <Scene key='rewards' component={Rewards} title='Reward' navigationBarStyle={styles.tabBar}/>
// //                     <Scene key='addnewcard' component={addnewcard} title='Add new Card' navigationBarStyle={styles.tabBar}/>
// //                 </Stack>
// //             </Router>
// //         );
// //     }
// // }

// const MerchantNavigator = () => {

//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 initialRouteName="Home"
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName;

//                         if (route.name === 'Home') {
//                             iconName = 'ios-home'
//                         } else if (route.name === 'Inventory') {
//                             iconName = 'ios-menu';
//                         } else if (route.name === 'Orders') {
//                             iconName = 'ios-paper';
//                         }
//                         return <Ionicons name={iconName} size={size} color={!focused ? colors.opaque : colors.primary} />;
//                     },
//                 })}
//                 tabBarOptions={{
//                     activeTintColor: colors.primary,
//                     inactiveTintColor: colors.opaque,
//                     activeBackgroundColor: colors.opaque,
//                     inactiveBackgroundColor: colors.primary 
//                 }}
//             >
//                 <Tab.Screen
//                     name="Home"
//                     component={HomeScreen}
//                 />
//                 <Tab.Screen
//                     name="My Carts"
//                     component={InventoryScreen}
//                 />
//                 <Tab.Screen
//                     name="My Cards"
//                     component={OrdersScreen}
//                 />
//                 <Tab.Screen
//                     name="Rewards"
//                     component={ServiceProviderHome}
//                 />
//                 {/* <Tab.Screen
//                     name="Carts"
//                     component={Orders}
//                 /> */}
//             </Tab.Navigator>
//         </NavigationContainer>
//     )
// }

// export default MerchantNavigator

// const styles = {
   
//     tabBar: {
//         height: 40,
//         borderTopColor: 'darkgrey',
//         borderTopWidth: 1        
//     }
// }

import React,{ Component} from 'react';
import {Router,Scene,Stack} from 'react-native-router-flux';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import VerificationCode from '../pages/VerificationCode';
import Home from '../screens/Home';
import  MyCart from '../screens/MyCart';
import Rewards from '../screens/Rewards';
import MyCard from '../screens/MyCard';
import addnewcard from '../pages/AddNewCard';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login"  initial={true}/>
                    <Scene key="signup" component={Signup} title="Sign up"/>
                    <Scene key='verificationCode' component={VerificationCode} title="code Verification" />
                    <Scene key='home' component={Home} title='Home Page' type='reset'  navigationBarStyle={styles.tabBar}/>
                    <Scene key='mycart' component={MyCart} title='Cart' navigationBarStyle={styles.tabBar}/>
                    <Scene key='mycard' component={MyCard} title='My Card' navigationBarStyle={styles.tabBar}/>
                    <Scene key='rewards' component={Rewards} title='Reward' navigationBarStyle={styles.tabBar}/>
                    <Scene key='addnewcard' component={addnewcard} title='Add new Card' navigationBarStyle={styles.tabBar} hideNavBar={false}/>

                </Stack>
            </Router>
        );
    }
}

const styles = {
   
    tabBar: {
        height: 40,
        borderTopColor: 'darkgrey',
        borderTopWidth: 1        
    }
}