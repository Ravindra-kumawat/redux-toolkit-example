import axios from "axios";
import { Navigate } from "react-router-dom";
import storage from "redux-persist/lib/storage";
const API_URL = process.env.REACT_APP_BASE_URL;

// Vendor Send OTP { Sinup Step-1 (Phone verification with OTP)}
const sendOtpSignUp = async (data) => {
  const response = await axios.post(`${API_URL}/api/vendors/send-otp`, data);
  return response.data;
};
// Vendor Verify OTP { Sinup Step-2 (Phone verification with OTP)}
const verifyOtpSignUp = async (data) => {
  const response = await axios.post(`${API_URL}/api/vendors/verify-otp`, data);
  return response.data;
};
// Vendor SignUp { Sinup Step-3 (Phone verification with OTP)}
const signUp = async (data) => {
  console.log("signup data", data);
  const response = await axios.post(`${API_URL}/api/vendors/signup`, data);
  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  }
  return response.data;
};
// vendor phone exist
const phoneExist = async (data) => {
  const response = await axios.post(
    `${API_URL}/api/vendors/phone-exists`,
    data
  );

  return response.data;
};
// Vendor Login
const vendorLogin = async (data) => {
  const response = await axios.post(`${API_URL}/api/vendors/login`, data);
  // console.log(response.data);
  if (response.data.success && response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  }
  return response.data;
};
// Vendor Send OTP { Forget Password or Pin Step-1 (Phone verification with OTP)}
const forgetPassword = async (data) => {
  const response = await axios.post(
    `${API_URL}/api/vendors/forgot-password`,
    data
  );
  return response.data;
};
// Vendor Set New Pin { Forget Pin  step-2(verify Otp) Step-3 (Update Pin)}
const updatePin = async (data) => {
  const response = await axios.post(`${API_URL}/api/vendors/update-pin`, data);
  return response.data;
};

// Vendor Change Pin { loged in vendor}
const changePin = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  const response = await axios.post(
    `${API_URL}/api/vendors/change-pin`,
    data,
    config
  );
  return response.data;
};

// Get new accessToken using refreshToken
const generateNewAccessToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const data = {
    phone: user?.phone,
    token: refreshToken,
  };
  console.log("data", data);
  const response = await axios.post(
    `${API_URL}/api/vendors/refresh-token`,
    data,
    config
  );
  if (response.status === 200 && response.data.success) {
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  if (
    response.status === 200 &&
    response.data.message === "Refresh Token Invalid"
  ) {
    storage.removeItem("persist:root");
    await localStorage.clear();
    <Navigate to={"/login"} />;
  }
  return response;
};

// logout
const logoutVendor = async (data) => {
  const accessToken = localStorage.getItem("accessToken");

  var dataConfig = JSON.stringify(data);
  var config = {
    method: "DELETE",
    url: `${API_URL}/api/vendors/logout`,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    data: dataConfig,
  };
  console.log(config);
  const response = await axios(config);
  return response;
};
// update profile
const updateProfile = async (data) => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.put(
    `${API_URL}/api/vendors/update/profile`,
    data,
    config
  );
  return response.data;
};

// delete profile
const deleteProfile = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.delete(
    `${API_URL}/api/vendors/delete/profile`,
    config
  );
  return response.data;
};

// Get verification status
const getVerificationStatus = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };

  const response = await axios.get(
    `${API_URL}/api/vendors/verificationStatus`,
    config
  );
  return response.data;
};
const authService = {
  sendOtpSignUp,
  verifyOtpSignUp,
  signUp,
  vendorLogin,
  updatePin,
  forgetPassword,
  phoneExist,

  changePin,
  generateNewAccessToken,
  logoutVendor,
  updateProfile,
  deleteProfile,
  getVerificationStatus,
};

export default authService;
