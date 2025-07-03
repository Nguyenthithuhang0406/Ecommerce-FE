import { createSlice } from "@reduxjs/toolkit";

const initState = {
  inputValue: "",
  inputImage: "",
  loading: false,
  result: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initState,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    setInputImage: (state, action) => {
      state.inputImage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
});

export const { setInputValue, setInputImage, setLoading, setResult } =
  searchSlice.actions;
export default searchSlice.reducer;
