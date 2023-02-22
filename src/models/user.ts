export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export type AuthRequest = Record<'email' | 'password', string>

export interface IUser {
  email: string;
  id: number;
  role: string;
}

export interface UserState {
  accessToken: string;
  user: IUser | null;
}

export interface CRUDResponse {
  message: string;
}

export type DeviceToBasketRequest = Record<'userId' | 'deviceId', number>

