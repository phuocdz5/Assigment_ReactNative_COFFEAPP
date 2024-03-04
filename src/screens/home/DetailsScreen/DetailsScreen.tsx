import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { products } from '../../../models/productsModel';
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, TextComponent, WeightComponent } from '../../../component';
import { ObjectId } from 'mongoose';
import { pricesArray } from './../../../models/productsModel';
import IMAGES from '../../../assets/images/Images';
import { FONTFAMILY } from '../../../../assets/fonts';
import COLORS from '../../../assets/colors/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { priceselector } from '../../../redux/reducers/pricesReducer';
import cartAPI from '../../../apis/cartAPI';
import { authSelector } from '../../../redux/reducers/authReducer';


const DetailsScreen = ({navigation,route}:any) => {
    const [idProduct,setId]= useState('');
    const [name, setName]=useState('');
    const [roasted,setRoasted]= useState('')
    const [price,setPrice]= useState('')
    const [imagelink_portrait,setImagelink_portrait]= useState('');
    const [imagelink_square,setImagelink_square]= useState('');
    const [prices,setPrices] = useState<pricesArray[]>([]);
    const [description,setDescription]= useState('')
    const [dataProduct,setData]= useState<products[]>([]);
    const [dataCart,setDataCart]= useState<products>();
    const authData = useSelector(authSelector)
    const sizeData = useSelector(priceselector)
    const {data} = route.params//data gửi từ homescreen trong carditemcomponent
    const dataArray = data[0] ;//data gồm dộ dài là 2 nên vị trí 0 tương ứng với toàn bộ products data trong mongoose
    const itemId = data[1] ; //vị trí 1 là id khi nhấn vào flatlist của carditemcomponent lấy được id của sản phẩm trong flatlist được click 
    const emailAuth = authData.email
    const quantity = 1
    const getPriceBySize = (productArray: products[], targetSize: string) => {
      for (const product of productArray) {//Lặp mảng product tìm size giống trong mảng prices của products
        const priceInfo = product.prices.find(price => price.size === targetSize);
        if (priceInfo) {
          return priceInfo.price;
        }
      }
      return '';
    };
     
    useEffect(() => {//khi render stack thì tự động set data và set id và trả về dataProduct, idProduct,sizeData
      const fetchData =() => {
        setData(dataArray);
        setId(itemId);
        handleData();
      };
      setPrice(getPriceBySize(dataProduct,sizeData))
      
      fetchData();
    }, [ dataProduct, idProduct,sizeData]);
    
    const filteredCoffeeArray =(value:String)=>{//tìm sản phẩm tương ứng với id
      return dataProduct.filter(item => item._id.toString() === value)
    }
    const setValues=(products:products)=>{
      const { name,roasted, prices,description, imagelink_portrait,imagelink_square } = products;
      setName(name);
      setRoasted(roasted);
      setPrices(prices);
      setDescription(description);
      setImagelink_portrait(imagelink_portrait)
      setImagelink_square(imagelink_square)
      setDataCart(products)
    }
    const handleData = ()=>{
    
      const specificKeyItem = filteredCoffeeArray(idProduct).find(product => product !== undefined && product !== null);//tìm được sản phẩm tương ứng với id tìm tiếp xem có undefined hoặc null không
      //nếu không thì sẽ setValue được tìm khi lọc qua id
      if(specificKeyItem){
        setValues(specificKeyItem)
      } 
    }
    const handleAddCart = async()=>{
      try {
        const res = await cartAPI.HandleCart('/addCart',{emailAuth,imagelink_square,name,roasted,sizeData,price,quantity},'post')
        navigation.navigate('Giỏ Hàng')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <ContainerComponent>
    {imagelink_portrait!=''?<Image src={imagelink_portrait} style={{ width: 'auto', height: '85%' }} />:undefined}
    <SectionComponent
      styles={{
        position: 'absolute',
        top: '8%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RowComponent justify='space-between' styles={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={IMAGES.Back_Icon} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={IMAGES.heart} style={{ width: 35, height: 35 }} />
        </TouchableOpacity>
      </RowComponent>
    </SectionComponent>
    <SectionComponent styles={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: '70%', width: '100%', height: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
      <RowComponent justify='space-between' styles={{ marginTop: 20, marginBottom: 20 }}>
        <RowComponent styles={{ flexDirection: 'column' }}>
          <TextComponent text={name} title size={25} />
          <TextComponent text={roasted} font={FONTFAMILY.poppins_regular} size={13} />
        </RowComponent>
        <RowComponent>
          <TouchableOpacity>
            <Image source={IMAGES.Coffee} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Image source={IMAGES.Milk} />
          </TouchableOpacity>
        </RowComponent>
      </RowComponent>
      <TextComponent text='Description' font={FONTFAMILY.poppins_medium} size={18} />
      <TextComponent
        numberOfLines={5}
        text={description}
        font={FONTFAMILY.poppins_regular} size={14} />
      <TextComponent text='Size' font={FONTFAMILY.poppins_medium} size={18} />
      <WeightComponent data={prices} />
      <RowComponent justify='space-between' styles = {{marginTop: 25}}>
        <RowComponent styles={{flexDirection: 'column'}}>
          <TextComponent text='Giá'/>
          <RowComponent>
          <TextComponent text='$' styles = {{marginRight: 10}} size={24} font={FONTFAMILY.poppins_bold} color={COLORS.HEX_ORANGE}/>
          <TextComponent text={price!=''?price:'0'} font={FONTFAMILY.poppins_bold} size={24}/>
          </RowComponent>
        </RowComponent>
        <ButtonComponent disable={price!=''?false:true}  styles={{height:56}} text='Thêm Vào Giỏ Hàng' type='orange' onPress={handleAddCart}/>
      </RowComponent>
    </SectionComponent>
  </ContainerComponent>
  )
}
export default DetailsScreen