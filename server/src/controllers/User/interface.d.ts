export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  phone: string;
  password?: string;
}
