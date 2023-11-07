import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "redux/store";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";

export interface EthState {
  txLoading: boolean;
  balance: string | undefined;
  currentNodeDepositAmount: string | undefined;
  latestBlockTimestamp: string;
  ethClaimRewardsLoading: boolean;
}

const initialState: EthState = {
  txLoading: false,
  balance: undefined,
  currentNodeDepositAmount: undefined,
  latestBlockTimestamp: "0",
  ethClaimRewardsLoading: false,
};

export const ethSlice = createSlice({
  name: "eth",
  initialState,
  reducers: {
    setEthTxLoading: (state: EthState, action: PayloadAction<boolean>) => {
      state.txLoading = action.payload;
    },
    setEthBalance: (
      state: EthState,
      action: PayloadAction<string | undefined>
    ) => {
      state.balance = action.payload;
    },
    setCurrentNodeDepositAmount: (
      state: EthState,
      action: PayloadAction<string>
    ) => {
      state.currentNodeDepositAmount = action.payload;
    },
    setLatestBlockTimestamp: (
      state: EthState,
      action: PayloadAction<string>
    ) => {
      state.latestBlockTimestamp = action.payload;
    },
    setEthClaimRewardsLoading: (
      state: EthState,
      action: PayloadAction<boolean>
    ) => {
      state.ethClaimRewardsLoading = action.payload;
    },
  },
});

export const {
  setEthTxLoading,
  setEthBalance,
  setCurrentNodeDepositAmount,
  setLatestBlockTimestamp,
  setEthClaimRewardsLoading,
} = ethSlice.actions;

export default ethSlice.reducer;

export const updateEthBalance = (): AppThunk => async (dispatch, getState) => {
  const metaMaskAccount = getState().wallet.metaMaskAccount;
  if (!metaMaskAccount) {
    dispatch(setEthBalance(undefined));
    return;
  }

  let ethWeb3 = getEthWeb3();
  try {
    const balance = await ethWeb3.eth.getBalance(metaMaskAccount);
    dispatch(setEthBalance(Web3.utils.fromWei(balance.toString(), "ether")));
  } catch (err: unknown) {}
};

export const updateEthLatestBlockTimestamp =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const web3 = getEthWeb3();
      const blockNumber = await web3.givenProvider.request({
        method: "eth_blockNumber",
      });
      const block = await web3.givenProvider.request({
        method: "eth_getBlockByNumber",
        params: [blockNumber, true],
      });
      const latestBlockTimestamp = parseInt(block.timestamp, 16);
      dispatch(setLatestBlockTimestamp(latestBlockTimestamp + ""));
    } catch (err: unknown) {}
  };
