import { Document } from 'mongoose';

export type UserRole = 'super-admin' | 'admin' | 'basic';

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  hash: string;
  salt: string;
  imgUrl: string;
  isVerified: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  otp: UserOTP;
  role: UserRole;
  stripeCustomerId: string;
}

export interface UserOTP {
  code: string;
  expires: Date | string;
}

export interface UserDocument extends User, Document {
  _id: string;
  comparePassword(password: string): Promise<boolean>;
  verifyOtpCode(code: string): Promise<boolean>;
}
