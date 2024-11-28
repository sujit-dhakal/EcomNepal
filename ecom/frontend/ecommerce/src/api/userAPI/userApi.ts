import { IUserApi } from "./IUserApi";
import { client } from "../baseConfig";
import { loginUserType, User } from "@/types/userTypes";

export class UserApi implements IUserApi {
  async userProfile(): Promise<User> {
    const response = await client.get("user-profile");
    return response.data;
  }
  async checkUserName(name: string) {
    const response = await client.get(`check-username/${name}/`);
    return {
      data: response.data,
    };
  }
  async logout(token: string) {
    const response = await client.post("logout/", {
      refresh: token,
    });
    return {
      data: response.data,
      status: response.status,
    };
  }
  async registerUser(user: User): Promise<{ data: User; status: number }> {
    const response = await client.post<User>("register/", user);
    return {
      data: response.data,
      status: response.status,
    };
  }
  async loginUser(
    user: loginUserType
  ): Promise<{ data: loginUserType; status: number }> {
    const response = await client.post<loginUserType>("login/", user);
    return {
      data: response.data,
      status: response.status,
    };
  }
  async checkEmail(email: string) {
    const response = await client.get(`check-email/${email}/`);
    return {
      data: response.data,
    };
  }
  async forgotPassword(email: string) {
    const response = await client.post("reset-password-email/", { email });
    return {
      data: response.data,
    };
  }
  async resetPassword(
    uid: string,
    token: string,
    data: { new_password: string; new_password_confirm: string }
  ) {
    const response = await client.post(`reset-password/${uid}/${token}/`, data);
    return {
      data: response.data,
    };
  }
  async changePassword(
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string
  ): Promise<{ msg: string; status: number }> {
    const response = await client.post("change-password/", {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    });
    return {
      msg: response.data.msg,
      status: response.status,
    };
  }
}
