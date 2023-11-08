import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userName: "",
  userAvatar: null,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData(state, action) {
      const { userId, userName, userAvatar } = action.payload;
      return { ...state, userId, userName, userAvatar };
    },
  },
});
