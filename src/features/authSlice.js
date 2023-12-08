import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { URL_HOST } from '../lib/helper';
import axios from 'axios';

const initialState = {
    user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message : ""
}

export const LoginUser = createAsyncThunk("user/Loginuser", async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${URL_HOST}/login`, {
            email : user.email,
            password : user.password
        });
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${URL_HOST}/me`);
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});
export const Logout = createAsyncThunk("user/Logout", async() => {
    await axios.delete(`${URL_HOST}/logout`);
});

export const RegisterUser = createAsyncThunk("user/registrasi", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`${URL_HOST}/users`, {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue('Register Gagal');
  }
});


export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : (state) => initialState
    },
    extraReducers : (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //get User Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });

        //register User
        builder.addCase(RegisterUser.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        });
        builder.addCase(RegisterUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;