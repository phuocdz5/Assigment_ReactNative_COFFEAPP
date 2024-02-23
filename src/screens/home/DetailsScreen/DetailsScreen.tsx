import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { products } from '../../../models/productsModel';
import { TextComponent } from '../../../component';
import { ObjectId } from 'mongoose';

const DetailsScreen = ({route}:any) => {
    const [dataProduct,setData]= useState<products[]>([]);
    const [isDataProduct,setIsData]= useState<products[]>([]);
    const [idProduct,setId]= useState('');
    const [image,setImage]= useState('');
    const {data} = route.params
    
    useEffect(()=>{
        const dataArray = data[0] ;
        const itemId = data[1] ; 
        setId(itemId)
        setData(dataArray)

    },[])
    const filteredCoffeeArray =(value:String)=>{
        return dataProduct.filter(item => item._id.toString() === value)
    }

    const specificKeyArray = filteredCoffeeArray(idProduct).map(product => product.name);
    
    

  return (
    <View>
        <TextComponent color='red' styles={{margin:50}} text={`${specificKeyArray}`}/>
    </View>
  )
}

export default DetailsScreen