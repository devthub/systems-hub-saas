import { NextRequest, NextResponse } from 'next/server';
import otpGenerator from 'otp-generator';

import { transporter } from '@/lib/api-helpers/transporter';
import dbConnect from '@/lib/config/db-connect';
import HttpException, { HttpCode, ReasonPhrase } from '@/lib/utils/http-exceptions';
import UserModel from '@/models/User.model';
import { UserOTP } from '@/types/user';
import { createOtpHTMLEmail } from './contents';

const HOUR_IN_MS = 3600000;
// const TEN_SECONDS = 10000;

export async function POST(req: NextRequest) {
  const { usernameOrEmail, password } = await req.json();

  try {
    await dbConnect();

    const userExists = await UserModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select('+password');

    if (!userExists) {
      throw new HttpException(HttpCode.NOT_FOUND, 'User not found!');
    }

    const isMatch = await userExists.comparePassword(password);

    if (!isMatch) {
      throw new HttpException(HttpCode.BAD_REQUEST, 'Invalid credentials!');
    }

    const otpCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const newOtp: UserOTP = {
      code: otpCode,
      expires: new Date(Date.now() + HOUR_IN_MS), //1 hour
    };

    const rawText = createOtpHTMLEmail(otpCode, '1');
    const htmlContent = createOtpHTMLEmail(otpCode, '1');

    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_SMTP_USER,
      to: userExists?.email,
      bcc: 'wendelle@transformhub.com.au',
      subject: 'Your One-Time Password (OTP) Code',
      text: rawText,
      html: htmlContent,
    });

    userExists.otp = newOtp;
    await userExists.save();

    return NextResponse.json(
      {
        ok: true,
        status: HttpCode.OK,
        message: 'Please check the verification code we sent to your email.',
      },
      { status: HttpCode.OK }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof HttpException) {
      return NextResponse.json(
        {
          ok: false,
          status: error.status,
          message: error.message,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        status: HttpCode.INTERNAL_SERVER_ERROR,
        ok: false,
        message: `${ReasonPhrase.INTERNAL_SERVER_ERROR}: ${(error as { message: string }).message} `,
      },
      { status: HttpCode.INTERNAL_SERVER_ERROR }
    );
  }
}
