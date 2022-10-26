import React, {useEffect, useState} from 'react'
import {Text} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Login from '../screens/Login/Login';
import Register from '../screens/Login/Register';
import {loadUser} from '../redux/action';
import Profile from '../screens/Profile';
import Tabs from './Tabs';
import CameraComponent from '../screens/Camera';
import ChangePassword from '../screens/Login/ChangePassword';
import Verify from '../screens/Login/Verify';
import ForgetPassword from '../screens/Login/ForgotPassword';
import ResetPassword from '../screens/Login/ResetPassword';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingScreen from '../components/LoadingScreen';
import { lightFONTS } from '../constants';
import ParkingDetails from '../screens/Home/ParkingDetails';

const Stack = createStackNavigator();

export const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'login'}
        >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} options={{headerShown: true, headerTitle: 'Register your Account', headerBackTitleVisible: false}} />
            <Stack.Screen name="forgotPassword" component={ForgetPassword} options={{ headerShown: true, headerTitle: '', headerBackTitleVisible: false}} />
            <Stack.Screen name="resetPassword" component={ResetPassword}  />
            
        </Stack.Navigator>
    );
}

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'home'}
        >
            <Stack.Screen name="home" component={Tabs} />
            <Stack.Screen name="changePassword" component={ChangePassword} options={{headerShown: true, headerTitle: 'Change Password', headerBackTitleVisible: false, headerTitleStyle: { ...lightFONTS.h3}}} />
            <Stack.Screen name="verify" component={Verify} />
            <Stack.Screen name="parkingDetails" component={ParkingDetails} />
            <Stack.Screen name="editProfile" component={Profile} options={{headerShown: true, headerTitle: 'Update Profile', headerBackTitleVisible: false, headerTitleStyle: { ...lightFONTS.h3}}} />
        </Stack.Navigator>
    );
}



const Stacks = () => {
    const [authStatus, setAuthStatus] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);
    const { isAuthenticated, loading } = useSelector(state => state.auth)
    console.log(isAuthenticated, loading + 'gg');
    return (
        loading? <LoadingScreen /> :
        <NavigationContainer independent={true}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerLeft: null,
                    gestureEnabled: false,
                }}
                initialRouteName={isAuthenticated? 'HomeStack' : 'LoginStack'}
            >
                <Stack.Screen name="LoginStack" component={LoginStack} />
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="camera" component={CameraComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Stacks