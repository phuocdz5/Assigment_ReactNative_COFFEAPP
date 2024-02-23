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
    const dataArray = data[0] ;
    const itemId = data[1] ; 
    
    
    useEffect(() => {
      const fetchData = async () => {
        setData(dataArray);
        setId(itemId);
        await handleImage();
      };
    
      fetchData();
    }, [ dataProduct, idProduct]);
    
    const filteredCoffeeArray =(value:String)=>{
      return dataProduct.filter(item => item._id.toString() === value)
    }

  
    const handleImage = ()=>{
      const specificKeyItem = filteredCoffeeArray(idProduct).find(product => product !== undefined && product !== null);
      if(specificKeyItem){
        const { name, _id, prices, imagelink_portrait } = specificKeyItem;
        setImage(imagelink_portrait.valueOf()) 

      }
    }

  return (
    <View>
      <Image style={{width:'auto',height:510}} src={image}/>
    </View> 
  )
}
export default DetailsScreen