import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const auth = useSelector(authSelector);
    return (
        <View style = {{flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <Text>Hello HomeScreen</Text>
            <Button title='Logout' onPress={async () => {
                await AsyncStorage.setItem('auth', auth.email);
                dispatch(removeAuth({}));
            }}/>
        </View>
    )
}

export default HomeScreen;