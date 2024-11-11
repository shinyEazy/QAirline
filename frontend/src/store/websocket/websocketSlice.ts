import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface WebsocketState {
  socket: WebSocket | null;
}

const initialState: WebsocketState = {
  socket: null,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setWebsocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload;
    },
    disconnectWebsocket: (state) => {
      if (state.socket) {
        state.socket.close();
        console.log("Connection is closed");
      }
    },
    sendAction: (state, action: PayloadAction<Object>) => {
      state.socket?.send(JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectWebsocket.fulfilled, (state, action) => {
      if (action.payload) {
        state.socket = action.payload;
        console.log("Connection is connected");
      }
    });
  },
});

function generateRandomString() {
  const arrayBuffer = new Uint8Array(6); // Tạo mảng 8 byte
  crypto.getRandomValues(arrayBuffer); // Gán giá trị ngẫu nhiên vào mảng
  const randomString = Array.from(arrayBuffer)
    .map((byte) => {
      return String.fromCharCode((byte % 26) + 97); // Chuyển đổi byte sang ký tự
    })
    .join("");
  return randomString;
}

export const connectWebsocket = createAsyncThunk(
  "websocket/connectWebsocket",
  async (_, { getState, dispatch }: any) => {
    let token = localStorage.getItem("accessToken");
    const socket = getState().websocket.socket;
    if (token && !socket) {
      token = JSON.parse(token);
      const randomString = generateRandomString();
      const socket = await new WebSocket(
        `ws://${process.env.REACT_APP_BACKEND_HOST}/ws/chat/${randomString}/?token=${token}`
      );
      return socket;
    }
    return null;
  }
);

export const { disconnectWebsocket } = websocketSlice.actions;

export default websocketSlice.reducer;
