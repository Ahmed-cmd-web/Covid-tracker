/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selcted: [],
  data: [],
  current: [
    {
      topic:'cases',
      title: "cases",
      pcolor: "red",
      sec: "rgb(255, 107, 107)",
    },
  ],
};

const reducer = createSlice({
  name: "info",
  initialState,
  reducers: {
    reducer1: (state, action) => {
      state.data = [...state.data, action.payload];
      return state;
    },
    reducer2: (state, action) => {
      state.selcted = [action.payload];
      return state;
    },
    reducer3: (state, action) => {
      state.current = [action.payload];
      return state;
    },
  },
});

export const { reducer1, reducer2, reducer3 } = reducer.actions;
export const info = (state) => state;

export default reducer.reducer;
