import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setOrderList, setPrice, setLoading, setError } =
  orderSlice.actions;
export default orderSlice.reducer;
