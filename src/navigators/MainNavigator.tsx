import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import { DetailsScreen } from '../screens';

const MainNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = "MainNavigator" component={TabNavigator}/>
        <Stack.Screen name = "DetailsScreen" component={DetailsScreen}/>
    </Stack.Navigator>
  )
}

export default MainNavigator;

// Tác dụng của MainNavigator là để phân biệt khi nào gọi đến Tab khi nào gọi đến authen vì 
// quan sát figma có những chỗ sẽ không có tabbottom vì vậy cần phải phân biệt. và như thế những 
// màn hình nào che phủ Tab đi sẽ được để trong MainNavigator