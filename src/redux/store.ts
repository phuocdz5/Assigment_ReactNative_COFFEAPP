import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { PricesReducer } from './reducers/pricesReducer';

const store = configureStore({
    reducer: {
        authReducer,
        PricesReducer
    }
})

export default store;