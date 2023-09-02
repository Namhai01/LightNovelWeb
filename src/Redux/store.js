import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./slice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;
