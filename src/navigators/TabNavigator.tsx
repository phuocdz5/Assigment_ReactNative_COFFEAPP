import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import { EventScreen, ExploreNavigator, FavouriteScreen, NotificationScreen } from '../screens';
import COLORS from '../assets/colors/Colors';
import { Briefcase, Heart, Home2, Notification } from 'iconsax-react-native';
import { TextComponent } from '../component';
import { FONTFAMILY } from '../../assets/fonts';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.HEX_BLACK,
                borderColor: COLORS.HEX_BLACK, 
            },
            tabBarIcon: ({ focused, color, size }) => {
                let icon: ReactNode;
                color = focused ? COLORS.HEX_ORANGE : COLORS.HEX_LIGHT_GREY

                switch (route.name) {
                    case 'Trang Chủ':
                        icon = <Home2 size={size} color={color} variant="Bold" />;
                        break;
                    case 'Giỏ Hàng':
                        icon = <Briefcase size={size} color={color} variant="Bold" />
                        break;
                    case 'Yêu Thích':
                        icon = <Heart size={size} color={color} variant="Bold" />
                        break;
                    case 'Thông Báo':
                        icon = <Notification size={size} color={color} variant="Bold" />
                        break;

                }
                return icon;
            },
            tabBarIconStyle: {
                marginTop: 4
            },
            tabBarLabel({ focused }) {
                return <TextComponent text={route.name} flex={0} size={12} color={focused ? COLORS.HEX_ORANGE : COLORS.HEX_LIGHT_GREY} font={FONTFAMILY.poppins_bold} />;
            },
        })}>
            <Tab.Screen name="Trang Chủ" component={ExploreNavigator} />
            <Tab.Screen name="Giỏ Hàng" component={EventScreen} />
            <Tab.Screen name="Yêu Thích" component={FavouriteScreen} />
            <Tab.Screen name="Thông Báo" component={NotificationScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator;