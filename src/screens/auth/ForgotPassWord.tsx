import React, { useState } from 'react'
import { ButtonComponent, InputComponent, SectionComponent, TextComponent } from '../../component';
import { ArrowLeft, Sms } from 'iconsax-react-native';
import COLORS from '../../assets/colors/Colors';
import { TouchableOpacity, View } from 'react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import { globalStyle } from '../../styles/globalStyle';

const ForgotPassWord = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    return (
        <View style = {globalStyle.container}>
            <SectionComponent>
                <TouchableOpacity style={{ paddingTop: 50, paddingBottom: 10 }}>
                    <ArrowLeft size={24} color={COLORS.WHITE}
                        onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TextComponent text='Resset Mật Khẩu' title font={FONTFAMILY.poppins_bold}/>
                <TextComponent text='Để đặt lại mật khẩu, bạn cần có email có thể được xác thực.' styles= {{paddingBottom: 30}} />
                <InputComponent 
                    value={email} 
                    placeholder='abc123@gmail.com'
                    onChange={val => setEmail(val)}
                    affix= {<Sms size={24} color={COLORS.HEX_LIGHT_GREY}/>}
                    />   
            </SectionComponent>
            <SectionComponent styles={{alignItems:'center'}}>
                <ButtonComponent text='Gửi' type='orange' styles={{width: '80%'}}/> 
            </SectionComponent>
        </View>
    )
}

export default ForgotPassWord;