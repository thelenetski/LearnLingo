import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

// Регистрация
export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, thunkAPI) => {
    try {
      // Создаем пользователя с email и паролем
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Обновляем имя пользователя
      await updateProfile(user, { displayName: name });

      // Возвращаем информацию о пользователе
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Unknown error");
    }
  }
);

// Вход
export const signIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Получить токен пользователя
      const token = await user.getIdToken();
      return { displayName: user.displayName, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Выход
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Обновление пользователя (Refresh)
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        // Используем onAuthStateChanged для восстановления пользователя
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          unsubscribe(); // Отписываемся после первого вызова

          if (user) {
            try {
              // Получить новый токен пользователя
              const token = await user.getIdToken(true);
              resolve({ displayName: user.displayName, token });
            } catch (error) {
              reject(error.message);
            }
          } else {
            reject("User is not logged in.");
          }
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
