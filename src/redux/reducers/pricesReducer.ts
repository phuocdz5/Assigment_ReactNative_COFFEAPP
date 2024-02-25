import { createSlice } from "@reduxjs/toolkit";
import { pricesArray } from "../../models/productsModel";


//này e dựa theo cái auth để lưu trạng của mảng prices chớ không hiểu lắm

interface PricesState {
  prices: pricesArray[];
}

const initialState: PricesState = {
  prices: [],
};

const priceslice = createSlice({
  name: 'prices',
  initialState:{
    pricesData: initialState
  },
  reducers: {
    addPrices: (state, action) => {state.pricesData = action.payload},
    removePrices: (state, action) => {state.pricesData = initialState},
    // Add other reducers as needed
  },
});

export const PricesReducer = priceslice.reducer;
export const { addPrices, removePrices } = priceslice.actions;
export const priceselector = (state: any) => state.PricesReducer.pricesData;
