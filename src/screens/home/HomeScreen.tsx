import React, { useEffect, useState } from 'react';
import { Button, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyle } from '../../styles/globalStyle';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, CardItemComponent, CategoriesList, ContainerComponent, InputComponent, SectionComponent, TextComponent } from '../../component';
import RowComponent from './../../component/RowComponent';
import IMAGES from '../../assets/images/Images';
import { FONTFAMILY } from '../../../assets/fonts';
import { Coffee, SearchNormal1 } from 'iconsax-react-native';
import { CoffeeData } from '../../data/CoffeeData';
import { BeansCoffeeData } from '../../data/BeansCoffee';
import productAPI from '../../apis/productAPI';
import { products } from '../../models/productsModel';

const HomeScreen = ({navigation}:any) => {
    const dispatch = useDispatch();
    const [search, setValueSearch] = useState('');
    const [product, setProduct] = useState<products[]>([]);
    const auth = useSelector(authSelector);
    const filteredCoffeeArray =(value:String)=>{
        return product.filter(item => item.type === value)
    }
    const getDataProduct = async ()=>{
        try {
            const res = await productAPI.HandleProduct('/getAllProduct');
            const data:products[] = await res.data;
            setProduct(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getDataProduct()
      }, []);
    return (
        <ContainerComponent isScroll>
            <SectionComponent styles={{marginTop:55}}>
                <RowComponent justify='space-between'>
                    <TouchableOpacity onPress={() => {navigation.navigate('SettingScreen')}}>
                        <Image source={IMAGES.iconTienIchHome} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('PersonalDetailsScreen')}}>
                        <Image source={IMAGES.avtUser}/>
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <TextComponent text={'Find the best\ncoffee for you'} font={FONTFAMILY.poppins_bold} size={28}/>
                <InputComponent 
                    value={search} 
                    onChange={val => setValueSearch(val)} 
                    placeholder='Find Coffee' affix ={<SearchNormal1 size={22} color={COLORS.HEX_LIGHT_GREY} />} />
            </SectionComponent>
            <SectionComponent>
                <CategoriesList/>
            </SectionComponent>
            <SectionComponent>
                <CardItemComponent navigation={navigation} checkCartItem={false} data={filteredCoffeeArray('Coffee')}/>
                <TextComponent text='Coffee beans' styles={{marginTop:25}}/>
            </SectionComponent>
            <SectionComponent>
                <CardItemComponent navigation={navigation} checkCartItem={false} data={filteredCoffeeArray('Bean')}/>
            </SectionComponent>
            
        </ContainerComponent>
    )
}

export default HomeScreen;