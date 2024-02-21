import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ForgotPassWord, LoginScreen, SignUpScreen, Verification } from '../screens';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthNavigators = () => {
    const [isExistingUser, setIsExistingUser] = useState(false);

    useEffect(() => {
        checkUserExisting()
    }, [])

    const Stack = createNativeStackNavigator();

    const checkUserExisting = async () => {
        const res = await AsyncStorage.getItem('auth');

        res && setIsExistingUser(true);
    }

    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        {
            !isExistingUser && (
                <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} />
            )
        }
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
        <Stack.Screen name='ForgotPassWord' component={ForgotPassWord}/>
        <Stack.Screen name='Verification' component={Verification}/>
    </Stack.Navigator>
}

export default AuthNavigators;