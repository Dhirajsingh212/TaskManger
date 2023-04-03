import {configureStore,createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        token:localStorage.getItem("token")||null,
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart(state,action){
            state.isFetching=true;
        },
        loginFail(state,action){
            state.isFetching=false;
            state.error=true;
        },
        loginSuccess(state,action){
            state.token=action.payload;
            localStorage.setItem("token",action.payload);
            state.isFetching=false;
            state.error=false;
        },
        logout(state,action){
            state.token=null;
            localStorage.setItem("token",null);
        },
        loadingStart(state,action){
            state.isFetching=true;
        },
        loadingSuccess(state,action){
            state.isFetching=false;
            state.error=false;
        },
        loadingFail(state,action){
            state.error=true;
            state.isFetching=false;
        }
    }
})

export const actions=userSlice.actions;

export const store=configureStore({
    reducer:userSlice.reducer
})