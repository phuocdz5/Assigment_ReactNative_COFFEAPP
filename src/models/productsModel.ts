import { ObjectId } from "mongoose"

export interface pricesArray{
    size:string,
    price:string,
    currency:string
}
export interface products{
    _id:ObjectId,
    name:string,
    description:string,
    roasted:string,
    imagelink_square:string,
    imagelink_portrait:string,
    prices:[pricesArray],
    type:string
}