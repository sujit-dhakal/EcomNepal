import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState, User } from "@/types/userTypes";
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  checkEmailThunk,
  checkUserNameThunk,
  userProfileThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  changePasswordThunk,
} from "./userThunk";

const initialState: userState = {
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  user: {
    username: "",
    first_name: "",
    last_name: "",
    user_id: "",
    email: "",
  },
};

export const buildUserSlice = () => {
  const registerUser = registerUserThunk();
  const loginUser = loginUserThunk();
  const logoutUser = logoutUserThunk();
  const checkEmail = checkEmailThunk();
  const checkUserName = checkUserNameThunk();
  const userProfile = userProfileThunk();
  const forgotPassword = forgotPasswordThunk();
  const resetPassword = resetPasswordThunk();
  const changePassword = changePasswordThunk();
  const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
      login(state) {
        state.isAuthenticated = true;
      },
      logout(state) {
        state.isAuthenticated = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(registerUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(registerUser.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(loginUser.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(logoutUser.rejected, (state) => {
          state.isError = true;
        })
        .addCase(userProfile.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          userProfile.fulfilled,
          (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload;
          }
        )
        .addCase(userProfile.rejected, (state) => {
          state.isError = true;
        })
        .addCase(forgotPassword.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        })
        .addCase(resetPassword.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        })
        .addCase(changePassword.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(changePassword.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(changePassword.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        });
    },
  });
  return {
    userSlice,
    actions: userSlice.actions,
    registerUser,
    loginUser,
    logoutUser,
    checkEmail,
    checkUserName,
    userProfile,
    forgotPassword,
    resetPassword,
    changePassword,
  };
};
