import { createSlice } from "@reduxjs/toolkit";
import { fetchTeachers } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: {},
    favorites: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetTeachers: (state) => {
      state.items = {};
    },
    addFav: (state, action) => {
      const existingItem = state.favorites.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favorites = [...state.favorites, action.payload];
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, handlePending)
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, handleRejected);
  },
});

export const { resetTeachers, addFav, setFilters, resetFilters } =
  teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;
