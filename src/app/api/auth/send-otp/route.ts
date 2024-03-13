import { NextRequest, NextResponse } from 'next/server';
import otpGenerator from 'otp-generator';

import { transporter } from '@/lib/api-helpers/transporter';
import dbConnect from '@/lib/config/db-connect';
import HttpException, { HttpCode, ReasonPhrase } from '@/lib/utils/http-exceptions';
import UserModel from '@/models/User.model';
import { UserOTP } from '@/types/user';
import { createOtpHTMLEmail, createOTPRawEmail } from './contents';

const HOUR_IN_MS = 3600000;
// const TEN_SECONDS = 10000;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { usernameOrEmail, password } = await req.json();

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

    userExists.otp = newOtp;

    const rawText = createOTPRawEmail(otpCode);
    const htmlContent = createOtpHTMLEmail(otpCode);

    const [user] = await Promise.all([
      userExists.save(),
      transporter.sendMail({
        from: process.env.NEXT_PUBLIC_SMTP_USER,
        to: userExists?.email,
        bcc: 'wendelle@transformhub.com.au',
        subject: 'Your One-Time Password (OTP) Code',
        text: rawText,
        html: htmlContent,
      }),
    ]);

    return NextResponse.json(
      {
        ok: true,
        status: HttpCode.OK,
        message: 'Please check the verification code we sent to your email.',
        user: JSON.parse(JSON.stringify(user)),
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
          user: null,
        },
        { status: error.status }
      );
    }

    return NextResponse.json(
      {
        status: HttpCode.INTERNAL_SERVER_ERROR,
        ok: false,
        message: `${ReasonPhrase.INTERNAL_SERVER_ERROR}: ${(error as { message: string }).message} `,
        user: null,
      },
      { status: HttpCode.INTERNAL_SERVER_ERROR }
    );
  }
}
