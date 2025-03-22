import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setShowSidebar } = stateSlice.actions;

export default stateSlice.reducer;
