import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../../../redux/reducers/authReducer';
import { ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../../component';
import { Image, TouchableOpacity, View } from 'react-native';
import IMAGES from '../../../assets/images/Images';
import { FONTFAMILY } from '../../../../assets/fonts';
import { ArrowRight2, Clock, Location, LogoutCurve, MessageQuestion, User } from 'iconsax-react-native';
import COLORS from '../../../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import  Modal  from 'react-native-modal/dist/modal';


const SettingScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleLogout = async () => {
        setModalVisible(true);
    };

    const handleLogoutConfirmed = async () => {
        // Thực hiện các bước đăng xuất ở đây
        await AsyncStorage.setItem('auth', auth.email);
        dispatch(removeAuth({}));

        // Ẩn modal sau khi đăng xuất thành công
        setModalVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <ContainerComponent>
            <SectionComponent styles={{ marginTop: 60, marginBottom: 40 }}>
                <RowComponent justify='flex-start'>
                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                        style={{
                            justifyContent: 'flex-start',
                            flex: 0.5
                        }}>
                        <Image source={IMAGES.Back_Icon} />
                    </TouchableOpacity>
                    <TextComponent text='Setting' size={18} font={FONTFAMILY.poppins_medium} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent justify='flex-start'>
                        <TouchableOpacity style={{ paddingRight: 35 }}>
                            <Clock size={24} color={COLORS.HEX_ORANGE} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.9 }}>
                            <TextComponent text='Lịch sử' font={FONTFAMILY.poppins_bold} size={14} />
                        </TouchableOpacity>
                    </RowComponent>
                    <TouchableOpacity>
                        <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent justify='flex-start'>
                        <TouchableOpacity style={{ paddingRight: 35 }}>
                            <User size={24} color={COLORS.HEX_ORANGE} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.9 }} onPress={() => navigation.navigate('PersonalDetailsScreen')}>
                            <TextComponent text='Thông tin cá nhân' font={FONTFAMILY.poppins_bold} size={14} />
                        </TouchableOpacity>
                    </RowComponent>
                    <TouchableOpacity>
                        <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent justify='flex-start'>
                        <TouchableOpacity style={{ paddingRight: 35 }}>
                            <Location size={24} color={COLORS.HEX_ORANGE} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.9 }}>
                            <TextComponent text='Địa chỉ' font={FONTFAMILY.poppins_bold} size={14} />
                        </TouchableOpacity>
                    </RowComponent>
                    <TouchableOpacity>
                        <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent justify='flex-start'>
                        <TouchableOpacity style={{ paddingRight: 35 }}>
                            <MessageQuestion size={24} color={COLORS.HEX_ORANGE} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.9 }}>
                            <TextComponent text='Trợ giúp' font={FONTFAMILY.poppins_bold} size={14} />
                        </TouchableOpacity>
                    </RowComponent>
                    <TouchableOpacity>
                        <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent justify='flex-start'>
                        <TouchableOpacity style={{ paddingRight: 35 }}>
                            <LogoutCurve size={24} color={COLORS.HEX_ORANGE} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.9 }} onPress={handleLogout}>
                            <TextComponent text='Đăng xuất' font={FONTFAMILY.poppins_bold} size={14} />
                        </TouchableOpacity>
                    </RowComponent>
                    <TouchableOpacity>
                        <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                style={{ marginHorizontal: 10, justifyContent: 'center' }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]} style={{ borderRadius: 10, padding: 20 }}>
                    <TextComponent text='Bạn có chắc muốn đăng xuất không?' color={COLORS.HEX_ORANGE} size={15} />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
                        <TouchableOpacity
                            style={{
                                marginRight: 30,
                                borderWidth: 1,
                                backgroundColor: COLORS.HEX_LIGHT_GRAY,
                                padding: 8,
                                borderRadius: 10,
                                width: 70
                            }}
                            onPress={closeModal}>
                            <TextComponent text='No' color={COLORS.HEX_LIGHT_GREY} styles={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginRight: 10,
                                borderWidth: 1,
                                backgroundColor: COLORS.HEX_ORANGE,
                                padding: 8,
                                borderRadius: 10,
                                width: 70
                            }}
                            onPress={handleLogoutConfirmed}>
                            <TextComponent text='Yes' color={COLORS.WHITE} styles={{ textAlign: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </Modal>
        </ContainerComponent>
    )
}

export default SettingScreen;