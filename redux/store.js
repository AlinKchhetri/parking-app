import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer, parkingReducer, locationReducer } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    parking: parkingReducer,
    location: locationReducer,
  },
});

export default store;