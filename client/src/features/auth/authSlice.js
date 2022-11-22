import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authAPI from './authAPI';

const initialState = {
  authData: null,
  user:null,
  error:false,
  loading:false,
  msg:null,
};

export const signUpAsync = createAsyncThunk("api/auth/signup",
    async (data, thunkAPI) => {
    try {
        // const tasks = await taskAPI.allTasks();
        const response = await authAPI.signup(data);
        const {result,token,msg} = response;
        console.log(result, token, msg);
        return {result, token, msg};
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const signInAsync = createAsyncThunk("api/auth/signin",
    async (data, thunkAPI) => {
    try {
       
        const response = await authAPI.signin(data);
        const {result,token,msg} = response;
        console.log("In signinAsync fulfill");
        return {result, token, msg};
    } catch (error) {
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
        console.log("In signinAsync reject", message);
        return thunkAPI.rejectWithValue(message);
    }
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      setAuth: (state,action)=>{
        console.log("in setAuth authSlice")
        const fromLocalStorage = JSON.parse(localStorage.getItem("profile"));
        const profile = fromLocalStorage?.profile;
        state.authData = profile;
      },
      removeAuth:(state,action)=>{
        console.log("in removeAuth authSlice")
        localStorage.removeItem('profile');
        state.authData = null;
      }
  },
  extraReducers: (builder) => {
    builder
    //Sign up new user.
    .addCase(signUpAsync.pending, (state) => {
       state.loading = true;
       state.error = null;
       state.msg = null;
    })
    .addCase(signUpAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      if(action.payload?.msg){
        state.msg = action.payload?.msg;
      }
      else{
        localStorage.setItem('profile', JSON.stringify({ token: action.payload?.token, profile:action.payload?.result }));
        state.authData = {profile: action.payload?.result, token: action.payload?.token };
     
      }
      
      
    })
    .addCase(signUpAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    //Signin existing user.
    .addCase(signInAsync.pending, (state) => {
       state.loading = true;
       state.error = null;
       state.msg = null;
    })
    .addCase(signInAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      localStorage.setItem('profile', JSON.stringify({ token: action.payload?.token, profile:action.payload?.result }));
      state.authData = {profile: action.payload?.result, token: action.payload?.token };
      state.msg = action.payload?.msg
    })
    .addCase(signInAsync.rejected, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.error = action.payload;
      state.msg = action.payload;
    })
  },
});

export const  { setAuth , removeAuth }  =  authSlice.actions

export default authSlice.reducer;
