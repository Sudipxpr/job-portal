import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;

      // Clear any persisted state
      try {
        localStorage.removeItem("persist:root"); // If using redux-persist
        sessionStorage.clear(); // In case you're using session-based storage
      } catch (err) {
        console.error("Error clearing storage:", err);
      }
    },
  },
});

export const { setLoading, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
