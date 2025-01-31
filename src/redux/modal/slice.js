import { createSlice } from "@reduxjs/toolkit";
// import {login, registration} from './auth/operation'

export const modalTypes = {
  login: "login",
  registration: "registration",
  booking: "booking",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    type: null,
    content: null,
  },
  reducers: {
    openLogin(state, action) {
      state.isOpen = true;
      state.type = modalTypes.login;
      state.content = action.payload;
    },
    openRegistration(state, action) {
      state.isOpen = true;
      state.type = modalTypes.registration;
      state.content = action.payload;
    },
    openBooking(state, action) {
      state.isOpen = true;
      state.type = modalTypes.booking;
      state.content = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
      state.content = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     isAnyOf(
  //       login.fulfilled,
  //       registration.fulfilled
  //     ),
  //     (state) => {
  //       state.isOpen = false;
  //       state.type = null;
  //       state.content = null;
  //     }
  //   );
  // },
});

// Експортуємо генератори екшенів та редюсер
export const { openLogin, openRegistration, openBooking, closeModal } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;
