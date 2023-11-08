import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userDataSlice } from "./userDataSlice";

const userDataReducer = combineReducers({
  userData: userDataSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData"],
};

const persistedReducer = persistReducer(persistConfig, userDataReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    });
  },
});

export const persistor = persistStore(store);

export const userDataActions = userDataSlice.actions;
