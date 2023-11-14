import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userDataSlice } from "./userDataSlice";
import { chatDataSlice } from "./chatDataSlice";
import { chatHandlerSlice } from "./chatHandlerSlice";

const userDataReducer = combineReducers({
  userData: userDataSlice.reducer,
  chatData: chatDataSlice.reducer,
  chatHandler: chatHandlerSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData", "chatData", "chatHandler"],
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
export const chatDataActions = chatDataSlice.actions;
export const chatHandlerActions = chatHandlerSlice.actions;
