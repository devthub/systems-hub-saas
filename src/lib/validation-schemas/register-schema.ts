import * as yup from 'yup';

import { onlyOneWord } from '../utils/common';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.')
    .max(15, 'Maximum of 15 characters for username.')
    .matches(onlyOneWord, 'Please provide only one word'),
  email: yup.string().required('Email is required.'),
  password: yup.string().required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password.'),
});

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const registerInitialValues: RegisterFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
