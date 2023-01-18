import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import storage from "redux-persist/lib/storage";
import authService from "./auth-service";

const initialState = {
  isSuccess: false,
  isError: false,
  isPending: false,
  message: "",
  branches: "",
  user_detail: "",
  adminType: "",
};
// Vendor Send OTP { Sinup Step-1 (Phone verification with OTP)}
export const sendOtpSignUp = createAsyncThunk(
  "Auth/Vendor/SignUp/Send-OTP",

  async (data, thunkAPI) => {
    try {
      return await authService.sendOtpSignUp(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Vendor Verify OTP { Sinup Step-2 (Phone verification with OTP)}
export const verifyOtpSignUp = createAsyncThunk(
  "Auth/Vendor/SignUp/Verify-OTP",

  async (data, thunkAPI) => {
    try {
      return await authService.verifyOtpSignUp(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Vendor SignUpDetails { Sinup Step-3 (Fill information in Form)}
export const signUp = createAsyncThunk(
  "Auth/Vendor/SignUp",

  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await authService.signUp(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Phone Exist
export const phoneExist = createAsyncThunk(
  "vendor/phone-exists",

  async (data, thunkAPI) => {
    try {
      return await authService.phoneExist(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Vendor Login
export const vendorLogin = createAsyncThunk(
  "Auth/Vendor/login",

  async (data, thunkAPI) => {
    try {
      return await authService.vendorLogin(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Vendor Send OTP { Forget Pin  Step-1 (Phone verification with OTP)}
export const forgetPassword = createAsyncThunk(
  "Auth/Vendor/Forget-password/Send-OTP",

  async (data, thunkAPI) => {
    try {
      return await authService.forgetPassword(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Vendor Set New Pin { Forget Pin  step-2(verify Otp) Step-3 (Update Pin)}
export const updatePin = createAsyncThunk(
  "Auth/Vendor/update-Pin",

  async (data, thunkAPI) => {
    try {
      return await authService.updatePin(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Vendor Change Pin { loged in vendor}
export const changePin = createAsyncThunk(
  "Auth/Vendor/change-pin",

  async (data, thunkAPI) => {
    try {
      return await authService.changePin(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Generate new acces Token
export const generateNewAccessToken = createAsyncThunk(
  "Auth/Vendor/Generate-New-AccessToken",
  async (_, thunkAPI) => {
    try {
      const response = await authService.generateNewAccessToken();
      return response;
    } catch (error) {
      if (error.response.data.message === "Refresh Token Invalid") {
        storage.removeItem("persist:root");
        await localStorage.clear();
        <Navigate to={"/login"} />;
      }
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Logout vendor
export const logoutVendor = createAsyncThunk(
  "Auth/Vendor/Logout",
  async (data, thunkAPI) => {
    try {
      const response = await authService.logoutVendor(data);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update profile
export const updateProfile = createAsyncThunk(
  "Auth/Vendor/update profile",

  async (data, thunkAPI) => {
    try {
      return await authService.updateProfile(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// delete profile
export const deleteProfile = createAsyncThunk(
  "Auth/Vendor/delete profile",

  async (_, thunkAPI) => {
    try {
      return await authService.deleteProfile();
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Check verifiaction statusget VerificationStatus
export const getVerificationStatus = createAsyncThunk(
  "vendors/verification status",

  async (_, thunkAPI) => {
    try {
      return await authService.getVerificationStatus();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

///
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOtpSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(sendOtpSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(verifyOtpSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtpSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(verifyOtpSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user_detail = action.payload.data;
        state.adminType = "Vendor";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(phoneExist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(phoneExist.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        // state.message = action.payload.message;
      })
      .addCase(phoneExist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(vendorLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(vendorLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user_detail = action.payload.data;
        state.adminType = "Vendor";
      })
      .addCase(vendorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        console.log(action.payload);
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(updatePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        console.log(action.payload);
      })
      .addCase(updatePin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        console.log(action.payload);
      })

      .addCase(changePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(changePin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(generateNewAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateNewAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.data.message;
      })
      .addCase(generateNewAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(logoutVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        // console.log(action.payload);
      })
      .addCase(logoutVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getVerificationStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVerificationStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(getVerificationStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
