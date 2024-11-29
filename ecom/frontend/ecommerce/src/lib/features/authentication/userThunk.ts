import { UserApi } from "@/api/userAPI/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserType, User } from "@/types/userTypes";
const userApi = new UserApi();

export const registerUserThunk = () => {
  return createAsyncThunk<User, User>(
    "user/registerUser",
    async (user: User) => {
      try {
        const response = await userApi.registerUser(user);
        return response;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    }
  );
};

export const loginUserThunk = () => {
  return createAsyncThunk<loginUserType, loginUserType>(
    "user/loginUser",
    async (user: loginUserType) => {
      try {
        const response = await userApi.loginUser(user);
        return response;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    }
  );
};

export const logoutUserThunk = () => {
  return createAsyncThunk("user/logout", async (token: string) => {
    try {
      const response = await userApi.logout(token);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const checkEmailThunk = () => {
  return createAsyncThunk("check-email", async (email: string) => {
    try {
      const response = await userApi.checkEmail(email);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
export const checkUserNameThunk = () => {
  return createAsyncThunk("check-userName", async (name: string) => {
    try {
      const response = await userApi.checkUserName(name);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const userProfileThunk = () => {
  return createAsyncThunk("user-profile", async () => {
    try {
      const response = await userApi.userProfile();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const forgotPasswordThunk = () => {
  return createAsyncThunk("user/forgotPassword", async (email: string) => {
    try {
      const response = await userApi.forgotPassword(email);
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  });
};

export const resetPasswordThunk = () => {
  return createAsyncThunk(
    "user/resetPassword",
    async (
      {
        uid,
        token,
        newPassword,
        newPasswordConfirm,
      }: {
        uid: string;
        token: string;
        newPassword: string;
        newPasswordConfirm: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await userApi.resetPassword(uid, token, {
          new_password: newPassword,
          new_password_confirm: newPasswordConfirm,
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
};

export const changePasswordThunk = () => {
  return createAsyncThunk(
    "user/changePassword",
    async (
      {
        oldPassword,
        newPassword,
        newPasswordConfirm,
      }: {
        oldPassword: string;
        newPassword: string;
        newPasswordConfirm: string;
      },
      { rejectWithValue }
    ) => {
      try {
        const response = await userApi.changePassword(
          oldPassword,
          newPassword,
          newPasswordConfirm
        );
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data);
      }
    }
  );
};
