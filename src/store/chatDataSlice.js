import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatId: "",
  user: {},
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    getFriendChatData(state, action) {
      const { chatId, user } = action.payload;
      return { ...state, chatId, user };
    },
  },
});
