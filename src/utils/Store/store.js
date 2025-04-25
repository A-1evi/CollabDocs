import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore, // Function to create the persistor object
  persistReducer, // Function to wrap your main reducer
  FLUSH, // Action types used by redux-persist, needed for middleware config
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
