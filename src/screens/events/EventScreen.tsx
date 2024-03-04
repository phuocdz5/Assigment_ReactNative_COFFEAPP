import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../component';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { CartItemComponent } from '../../component/CardItemComponent';
import { products } from '../../models/productsModel';

const EventScreen = ({navigation,route}:any) => {
  const [dataProduct,setData]= useState<products[]>([]);
  // const {data} = route.params

  // useEffect(()=>{
  // setData(data)
    
  // },[dataProduct])
  // console.log(dataProduct)
  return (
    <ContainerComponent style={{marginTop:55}}>
      <SectionComponent>
        <Text>dá</Text>
        {/* <CartItemComponent size={data[0]} checkCartItem={true} data={dataProduct} navigation={navigation} price={data[2]}/> */}
      </SectionComponent>
      <SectionComponent >
        <RowComponent justify='space-between' styles = {{marginTop: 25}}>
          <RowComponent styles={{flexDirection: 'column'}}>
            <TextComponent text='Giá'/>
            <RowComponent>
            <TextComponent text='$' styles = {{marginRight: 10}} size={24} font={FONTFAMILY.poppins_bold} color={COLORS.HEX_ORANGE}/>
            <TextComponent text={'200.2'} font={FONTFAMILY.poppins_bold} size={24}/>
            </RowComponent>
            </RowComponent>
          <ButtonComponent   styles={{height:56}} text='Thêm Vào Giỏ Hàng' type='orange'/>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}

export default EventScreen;