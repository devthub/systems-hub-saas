'use server';

import UserService from '@/lib/services/user/user-service';
import { RegisterFormValues, registerSchema } from '@/lib/validation-schemas/register-schema';

export default async function registerNewUser(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  try {
    const newUser: RegisterFormValues = { email, password, username, confirmPassword };

    await registerSchema.validate(newUser, {
      abortEarly: false,
      stripUnknown: true,
    });

    const user = await UserService.createNewUser(newUser);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('🚀 ~ file: registerNewUser.ts:10 ~ registerNewUser ~ error:', error);
    throw error;
  }
}
