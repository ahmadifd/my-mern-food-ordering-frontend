import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
