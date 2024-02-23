import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../assets/colors/Colors';
import TextComponent from './TextComponent';
import { FONTFAMILY } from '../../assets/fonts';

interface Category {
    id: string;
    name: string;
}

const data: Category[] = [
    { id: '1', name: 'All' },
    { id: '2', name: 'Capuchino' },
    { id: '3', name: 'Americano' },
    { id: '4', name: 'Espresso' },
    { id: '5', name: 'Robusta Beans' },
    { id: '6', name: 'Liberica Beans'},
    { id: '7', name: 'Espresso1' },
    { id: '8', name: 'Espresso2' },
];

const CategoriesList: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('All');

    const renderCategoryItem = ({ item }: { item: Category }) => {
        const isSelected = item.name === selectedCategory;
        return (
            <TouchableOpacity
                style={[styles.categoryItem, isSelected ? styles.selectedCategory : null]}
                onPress={() => setSelectedCategory(item.name)}
            >
                <TextComponent 
                    text={item.name}
                    color={isSelected ? COLORS.WHITE : COLORS.HEX_LIGHT_GREY } 
                    font={FONTFAMILY.poppins_medium}/>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.HEX_LIGHT_GREY,
    },
    selectedCategory: {
        backgroundColor: COLORS.HEX_ORANGE,
    },
});


export default CategoriesList;