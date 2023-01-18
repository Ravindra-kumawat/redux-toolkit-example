import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import masterSlice from "./master-data/master-slice";
// Vendor
import authSlice from "./vendor/auth/auth-slice";
import branchSlice from "./vendor/dashboard/branch-management/barnch-slice";
import groupSlice from "./vendor/dashboard/group-management/group-slice";
import userSlice from "./vendor/dashboard/user-management/user-slice";
import generalOfferSlice from "./vendor/dashboard/offer-management/general/general-offer-slice";
import prepaidCardOfferSlice from "./vendor/dashboard/offer-management/prepaid-card/prepaid-card-offer-slice";
import loyaltyCardOfferSlice from "./vendor/dashboard/offer-management/loyalty-card/loyalty-card-offer-slice";
import couponSlice from "./vendor/dashboard/coupon-management/coupon-slice";
import cardSlice from "./vendor/dashboard/card-management/card-slice";
//Admin
import adminAuthSlice from "./admin/auth/admin-auth-slice";
import adminVendorSlice from "./admin/dashboard/vendor-slice";
import adminCustomerSlice from "./admin/dashboard/customer/customer-slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    master: masterSlice,
    auth: authSlice,
    group: groupSlice,
    branch: branchSlice,
    user: userSlice,
    // offer-management
    general_offer: generalOfferSlice,
    prepaid_card_offer: prepaidCardOfferSlice,
    loyalty_card_offer: loyaltyCardOfferSlice,
    //
    coupon_management: couponSlice,
    card_management: cardSlice,
    admin_auth: adminAuthSlice,
    admin_vendors: adminVendorSlice,
    admin_customers: adminCustomerSlice,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export const persistor = persistStore(store);
