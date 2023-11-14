import { createSlice } from "@reduxjs/toolkit";

export const chatHandlerSlice = createSlice({
  name: "chatHandler",
  initialState: false,
  reducers: {
    startChatHandler: (state) => (state = true),
    endChatHandler: (state) => (state = false),
  },
});
