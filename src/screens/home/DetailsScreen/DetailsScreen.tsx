import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { products } from '../../../models/productsModel';
import { TextComponent } from '../../../component';
import { ObjectId } from 'mongoose';
import { pricesArray } from './../../../models/productsModel';


const DetailsScreen = ({route}:any) => {
    const [idProduct,setId]= useState('');
    const [name, setName]=useState('');
    const [roasted,setRoasted]= useState('')
    const [imagelink_portrait,setImagelink_portrait]= useState('');
    const [prices,setPrices] = useState<pricesArray[]>([]);
    const [description,setDescription]= useState('')
    const [dataProduct,setData]= useState<products[]>([]);
    const {data} = route.params
    const dataArray = data[0] ;
    const itemId = data[1] ; 
    
    
    
    useEffect(() => {
      const fetchData =() => {
        setData(dataArray);
        setId(itemId);
        handleData();
      };
    
      fetchData();
    }, [ dataProduct, idProduct]);
    
    const filteredCoffeeArray =(value:String)=>{
      return dataProduct.filter(item => item._id.toString() === value)
    }
    const setValues=(products:products)=>{
      const { name,roasted, prices,description, imagelink_portrait } = products;
      setName(name);
      setRoasted(roasted);
      setPrices(prices);
      setDescription(description);
      setImagelink_portrait(imagelink_portrait)
    }
    const handleData = ()=>{
    
      const specificKeyItem = filteredCoffeeArray(idProduct).find(product => product !== undefined && product !== null);
      if(specificKeyItem){
        setValues(specificKeyItem)
      } 
    }

  return (
    <View>
      {imagelink_portrait!=""?<Image style={{width:'auto',height:510}} src={imagelink_portrait}/>:undefined}
    </View> 
  )
}
export default DetailsScreen