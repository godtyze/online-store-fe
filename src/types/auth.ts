export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export type AuthRequest = Record<'email' | 'password', string>

export type IUser = {
  email: string;
  id: number;
  role: string;
}

export type UserState = {
  accessToken: string;
  user: IUser | null;
}