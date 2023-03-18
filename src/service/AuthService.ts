import {
  IUser,
  IUserEdit,
  IUserLogin,
  IUserRegister,
} from '@/utils/interface/user';
import { url } from '@/utils/values';
import axios, { AxiosResponse } from 'axios';

class AuthService {
  private readonly http = axios.create({
    baseURL: url.api,
  });

  async login(userObj: IUserLogin) {
    try {
      const response = await this.http.post<IUser>(
        `${url.userUrl}${url.loginUrl}`,
        userObj
      );
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }

  async register(userObj: IUserRegister) {
    try {
      const response = await this.http.post(
        `${url.userUrl}${url.registerUrl}`,
        userObj
      );
      const result: AxiosResponse<IUser, any> = response.data;
      return result;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }

  async update(userObj: IUserEdit, token: string) {
    try {
      const response = await this.http.put(`${url.userUrl}`, userObj, {
        headers: {
          'x-auth-token': token,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof Error) return error;
    }
  }
}

export default new AuthService();
