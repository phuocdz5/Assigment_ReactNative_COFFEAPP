import { ObjectId } from "mongoose"

interface pricesArray{
    size:String,
    price:String,
    currency:String
}
export interface products{
    _id:ObjectId,
    name:String,
    description:String,
    roasted:String,
    imagelink_square:String,
    imagelink_portrait:String,
    prices:[pricesArray],
    type:String
}