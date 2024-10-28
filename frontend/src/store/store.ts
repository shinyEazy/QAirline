import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import websocketReducer from "./websocket/websocketSlice";
import adminSettingReducer from "./admin/adminSettingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    websocket: websocketReducer,
    adminSetting: adminSettingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
