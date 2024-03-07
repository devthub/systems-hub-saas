import axios, { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { LoginFormValues } from '@/lib/services/user/user-service';
import HttpException from '@/lib/utils/http-exceptions';
import { useAppContext } from '../App.context';

export function useAuthHooks() {
  const { showToast } = useAppContext();
  const router = useRouter();

  const handleSendOtp = async (
    { usernameOrEmail, password }: LoginFormValues,
    setStepNumber: React.Dispatch<React.SetStateAction<number>>,
    stepNumber: number,
    totalSteps: number
  ) => {
    try {
      const res = await axios.post('/api/auth/send-otp', {
        usernameOrEmail,
        password,
      });

      setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));

      showToast({
        status: 'success',
        title: 'Success!',
        description: res.data?.message,
        position: 'top',
      });
      return;
    } catch (error) {
      console.error(error);

      if (error instanceof HttpException) {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: error.message,
          position: 'top',
        });
      } else if (error instanceof AxiosError) {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: error.response?.data?.message,
        });
      } else {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: (error as Error).message,
        });
      }
    }
  };

  const handleSignIn = async (
    { usernameOrEmail, password, otpCode }: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        usernameOrEmail,
        password,
        otpCode,
      });

      setSubmitting(false);
      if (!res?.ok) {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: res?.error,
          position: 'top',
        });
      }

      return showToast({
        status: 'success',
        title: 'Success!',
        description: 'Login Successful!',
        position: 'top',
      });
    } catch (error) {
      console.error(error);
      setSubmitting(false);

      if (error instanceof HttpException) {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: error.message,
          position: 'top',
        });
      } else if (error instanceof AxiosError) {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: error.response?.data?.message,
        });
      } else {
        return showToast({
          status: 'error',
          title: 'Login Failed!',
          description: (error as Error).message,
        });
      }
    }
  };

  const handleSignOut = async ({ asPath }: { asPath?: string; dontPush?: boolean }) => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `/auth/signin?callbackUrl=${asPath}`,
    });

    router.push(data.url);
  };

  return {
    handleSignIn,
    handleSignOut,
    handleSendOtp,
  };
}
