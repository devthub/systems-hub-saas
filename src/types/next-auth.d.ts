import { DefaultSession } from 'next-auth';

import 'next-auth/jwt';

import { User, UserOTP, UserRole } from './user';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
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
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
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
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    user: User;
  }
}
