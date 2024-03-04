import { View, ImageBackground, ScrollView, StyleProp, ViewStyle, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyle } from '../styles/globalStyle';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean; 
  style?: StyleProp<ViewStyle> 
}
const ContainerComponent = (props: Props) => {

  const { isImageBackground, isScroll, title, children, back,style } = props;

  const returnContainer = isScroll ? <ScrollView>{children}</ScrollView> : <View>{children}</View>;
  return isImageBackground ? (<ImageBackground>{returnContainer}</ImageBackground>) : (
    <SafeAreaView style = {[globalStyle.container]}>
      <View style={style}>
        {returnContainer}
      </View>
    </SafeAreaView>
  );
};

export default ContainerComponent;