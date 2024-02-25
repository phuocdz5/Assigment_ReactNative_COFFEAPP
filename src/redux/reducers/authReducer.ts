import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root";

export interface AuthState {
    id: string,
    email: string,
    accesstoken: string,
}

const initialState: AuthState = {
    id: '',
    email: '',
    accesstoken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState
    },
    reducers: {
        addAuth: (state, action) => {state.authData = action.payload},
        removeAuth: (state, action) => {state.authData = initialState},
    }
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;
export const getAuth = (state: RootState) => state.authReducer.authData;

// Tạo selector sử dụng createSelector
export const authSelector = createSelector(
    [getAuth],
    (authData) =>{
        return authData
    }
);


// initialState là các cái giá trị ban đầu 
// reducers nó sẽ chứa các cái hàm để xử lý các cái moveuser hoặc là adduser hoặc edituser