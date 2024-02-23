import React, { useEffect, useState } from 'react';
import { Alert, Image, Switch } from 'react-native';
import { 
    ButtonComponent, 
    InputComponent, 
    KeyboardAvoidingWrapper, 
    RowComponent, 
    SectionComponent, 
    TextComponent } from '../../component';
import { Lock, Sms } from 'iconsax-react-native';
import COLORS from '../../assets/colors/Colors';
import IMAGES from '../../assets/images/Images';
import { FONTFAMILY } from '../../../assets/fonts';
import { Facebook, Google } from '../../assets/svgs';
import authenticationAPI from '../../apis/authAPI';
import { Validate } from '../../utils/validate';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {

    // Lấy dữ liệu
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const emailValidation = Validate.email(email);
    
        if (!email || !password || !emailValidation) {
          setIsDisable(true);
        } else {
          setIsDisable(false);
        }
      }, [email, password]);

    const handleLogin = async () => {

        const emailValidation = Validate.email(email);
        if(emailValidation) {
            try {
                const res = await authenticationAPI.HandleAuthentication('/login', {email, password}, 'post');
                dispatch(addAuth(res.data));
                await AsyncStorage.setItem(
                    'auth',
                    isRemember ? JSON.stringify(res.data) : email,
                  );
                await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email);
            } catch (error) {
                console.log(error)
            }
        } else {
            Alert.alert('Email is not correct!!!');
        }
    }
  
    return (
        <KeyboardAvoidingWrapper>
            <SectionComponent
                styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 75
                }}>
                <Image
                    source={IMAGES.LogoLogin}
                    style={{ width: 142, height: 142, marginBottom: 20 }} />
            </SectionComponent>
            <SectionComponent>
                <TextComponent
                    title
                    text='Đăng Nhập'
                    size={45}
                    font={FONTFAMILY.poppins_bold}
                    styles={{ marginBottom: 20, }} />
                <InputComponent
                    value={email}
                    placeholder='Email'
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={COLORS.HEX_LIGHT_GREY} />} />
                <InputComponent
                    value={password}
                    placeholder='Mật khẩu'
                    onChange={val => setPassword(val)}
                    isPassword
                    affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />} />
            </SectionComponent>
            <SectionComponent>
                <RowComponent  justify='space-between'>
                    <RowComponent  onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ false: COLORS.WHITE, true: COLORS.HEX_ORANGE }}
                            thumbColor={isRemember ? COLORS.WHITE : COLORS.HEX_ORANGE}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />
                        <TextComponent text='Ghi nhớ tài khoản' />
                    </RowComponent>
                    <ButtonComponent
                        text='Quên mật khẩu?'
                        onPress={() => navigation.navigate('ForgotPassWord') }
                        type="link" />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ marginTop: 20 }}>
                <ButtonComponent 
                    disable= {isDisable}
                    text='ĐĂNG NHẬP' 
                    type='orange'
                    styles={{height:56}}
                    onPress={handleLogin}/>
            </SectionComponent>
            <SectionComponent>
                <TextComponent
                    text='Đăng nhập với'
                    color={COLORS.HEX_LIGHT_GREY}
                    styles={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: FONTFAMILY.poppins_medium,
                        marginBottom: 10
                    }} />
                <RowComponent>
                    <ButtonComponent 
                        text='Google' 
                        iconFlex='left'
                        type='orange'
                        styles = {{
                            backgroundColor: COLORS.WHITE, 
                            flex: 1, 
                            marginRight: 7, height:56}}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        icon ={<Google/>}
                        />
                    <ButtonComponent 
                        text='Facebook' 
                        iconFlex='left'
                        type='orange'
                        styles = {{backgroundColor: COLORS.WHITE, flex: 1, height:56}}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        icon= {<Facebook/>}/>    

                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text="Bạn chưa có tài khoản?  " />
                    <ButtonComponent type='link' text='Đăng ký' onPress={() => {
                        navigation.navigate('SignUpScreen')
                    }}/>
                </RowComponent>
            </SectionComponent>
        </KeyboardAvoidingWrapper>
    )
}

export default LoginScreen;

// <InputComponent value={email} onChange={val => setEmail(val)}/>  bingding dữ liệu 2 chiều
// nghĩa là từ email gán xuống sau khi có sự thay đổi thì gán ngược lại lên.