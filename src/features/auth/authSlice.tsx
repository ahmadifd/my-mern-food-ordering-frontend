import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthInfo {
  token: string | null;
}

const initialState: AuthInfo = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthInfo, action: PayloadAction<AuthInfo>) => {
      const accessToken = action.payload.token;
      state.token = accessToken;
    },
    signOut: (state: AuthInfo) => {
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;

export const { setCredentials, signOut } = authSlice.actions;
