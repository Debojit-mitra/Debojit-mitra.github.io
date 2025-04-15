import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeSlice";
import portfolioReducer from "./reducers/portfolioSlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    portfolio: portfolioReducer,
    auth: authReducer,
  },
});

export default store;
