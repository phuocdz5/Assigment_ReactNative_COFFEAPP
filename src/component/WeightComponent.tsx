import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';
import COLORS from '../assets/colors/Colors';
import { FONTFAMILY } from '../../assets/fonts';
import { pricesArray } from '../models/productsModel';
import { useDispatch } from 'react-redux';
import { addPrices } from '../redux/reducers/pricesReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props{
    data:any;
}

const WeightComponent = (props:Props) => {
    const dispatch = useDispatch()
    const {data}=props
    const [selectedCategory, setSelectedCategory] = useState<string | null>();
    const dataPrices = async()=>{
        dispatch(addPrices(selectedCategory))
        await AsyncStorage.setItem(
            'prices',
            selectedCategory!=undefined?selectedCategory:''
        )//gửi dữ liệu vào store của prices với name prices trong pricesReducer
    }
    const renderCategoryItem = ({ item }: { item: pricesArray }) => {
        const isSelected = item.size === selectedCategory;
        dataPrices()
        return (
            <TouchableOpacity
                style={[styles.categoryItem, isSelected ? styles.selectedCategory : null]}
                onPress={() => setSelectedCategory(item.size)}>
                
                <TextComponent
                    text={item.size}
                    color={isSelected ? COLORS.WHITE : COLORS.HEX_LIGHT_GREY}
                    font={FONTFAMILY.poppins_medium} />
            </TouchableOpacity>
        );
    };

    return (
        <View   >
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.size}
                renderItem={renderCategoryItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        minWidth:80,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.HEX_LIGHT_GREY,
        marginHorizontal: 20,
        flexDirection:'row',
        justifyContent:'center'

    },
    selectedCategory: {
        backgroundColor: COLORS.HEX_ORANGE,
    },
});


export default WeightComponent;