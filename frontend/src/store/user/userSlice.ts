import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  fullname: string;
  username: string;
  password: string;
  prompt: string;
  avt_url: string;
  isReady: boolean;
  verified: boolean;
}

const initialState: UserState = {
  fullname: "",
  username: "",
  password: "",
  prompt: "",
  avt_url: "",
  isReady: false,
  verified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullname = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
    setAvatarURL: (state, action: PayloadAction<string>) => {
      state.avt_url = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setPrompt,
  setAvatarURL,
  setIsReady,
  setFullName,
  setVerified,
} = userSlice.actions;

export default userSlice.reducer;
