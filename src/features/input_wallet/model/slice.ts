import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidETHAddress } from "../../../shared";

type WalletState = {
  address: string;
};

const getInitialAddress = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("walletAddress") || "";
  }
  return "";
};

const initialState: WalletState = {
  address: getInitialAddress(),
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
      if (typeof window !== "undefined") {
        if (isValidETHAddress(action.payload)) {
          localStorage.setItem("walletAddress", action.payload);
        }
      }
    },
    clearWalletAddress(state) {
      state.address = "";
      if (typeof window !== "undefined") {
        localStorage.removeItem("walletAddress");
      }
    },
  },
});

export const { setWalletAddress, clearWalletAddress } = walletSlice.actions;
export default walletSlice.reducer;
