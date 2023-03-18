export interface IUser {
  email: string;
  name: string;
  token: string;
  _id: string;
  isAdmin: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserEdit {
  name: string;
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
