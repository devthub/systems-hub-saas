'use client';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  PinInput,
  PinInputField,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import { useAuthHooks } from '@/lib/contexts/auth/Auth.hooks';
import { LoginFormValues } from '@/lib/services/user/user-service';
import { IFormikOnSubmitFn } from '@/types/formik-helpers';

export const loginSchema = yup.object().shape({
  usernameOrEmail: yup.string().required('Username or Email is required.'),
  password: yup.string().required('Password is required.'),
});

export const loginInitialValues: LoginFormValues = {
  usernameOrEmail: '',
  password: '',
  otpCode: null,
};

const stepItems = [
  {
    label: 'Sign in to your account',
    subtitle: 'Please fill-out all required fields.',
  },
  {
    label: 'OTP Code',
    subtitle: 'Please enter the verification code we sent to your email.',
  },
];

const SignInForm = () => {
  const { handleSignIn, handleSendOtp } = useAuthHooks();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [stepNumber, setStepNumber] = useState(0);

  const totalSteps = stepItems.length;

  const handleSignInSendOtp: IFormikOnSubmitFn<LoginFormValues> = async (values, { setSubmitting }) => {
    const callbackUrl = searchParams?.get('callbackUrl');

    await handleSendOtp(
      {
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
      },
      setStepNumber,
      stepNumber,
      totalSteps
    );

    setSubmitting(false);

    router.push(
      `/signin?${
        callbackUrl
          ? `callbackUrl=${callbackUrl}&usernameOrEmail=${values.usernameOrEmail}`
          : `usernameOrEmail=${values.usernameOrEmail}`
      }`
    );
  };

  const handleSignInUser: IFormikOnSubmitFn<LoginFormValues> = async (values, formikProps) => {
    await handleSignIn(
      {
        usernameOrEmail: values.usernameOrEmail,
        password: values.password,
        otpCode: values.otpCode,
      },
      formikProps
    );
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    formikProps.setSubmitting(false);
  };

  const handleSubmissions = [handleSignInSendOtp, handleSignInUser];

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: handleSubmissions[stepNumber],
  });

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>{stepItems[stepNumber].label}</Heading>
          <Text>{stepItems[stepNumber].subtitle}</Text>
          {stepNumber === 0 && (
            <>
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                  <FormControl
                    isRequired
                    isInvalid={!!(formik.errors.usernameOrEmail && formik.touched.usernameOrEmail)}
                    isDisabled={formik?.isSubmitting}
                    aria-label="Username"
                  >
                    <FormLabel>Username Or Email</FormLabel>
                    <Input
                      type="text"
                      placeholder="enter username"
                      name="usernameOrEmail"
                      value={formik.values.usernameOrEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.usernameOrEmail && formik.touched.usernameOrEmail ? (
                      <FormErrorMessage fontSize="xs">{formik.errors.usernameOrEmail}</FormErrorMessage>
                    ) : (
                      <FormHelperText fontSize="xs">You can also enter your email.</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={!!(formik.errors.password && formik.touched.password)}
                    isDisabled={formik?.isSubmitting}
                    aria-label="Password"
                  >
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="enter password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <FormErrorMessage fontSize="xs">{formik.errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>

                <Stack spacing={6} mt={4}>
                  <Stack direction={{ base: 'column', sm: 'row' }} align={'center'} justify={'space-between'}>
                    <Link as={NextLink} href={'/register'} color={'blue.500'}>
                      Register
                    </Link>
                    <Button as={Link} color={'blue.500'} variant={'ghost'} fontWeight={'normal'}>
                      Forgot password?
                    </Button>
                  </Stack>
                  <Button
                    loadingText="Signing in..."
                    isLoading={formik.isSubmitting}
                    type="submit"
                    bg={'#80bC00'}
                    _hover={{ bg: '#99c932' }}
                    color="#fff"
                    // colorScheme={'green'}
                    // variant={'solid'}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </>
          )}

          {stepNumber === 1 && (
            <form onSubmit={formik.handleSubmit}>
              <VStack w="full" align={'flex-start'} spacing={4}>
                <HStack justifyContent={'center'}>
                  <PinInput
                    id="otpCode"
                    type="number"
                    size="lg"
                    onChange={(value: string) => formik.setFieldValue('otpCode', value)}
                  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <HStack w="full">
                  <Button type="button" variant={'ghost'} onClick={() => setStepNumber(Math.max(stepNumber - 1, 0))}>
                    Back
                  </Button>
                  <Button
                    loadingText="Verifying..."
                    isLoading={formik.isSubmitting}
                    type="submit"
                    // colorScheme={'blue'}
                    // variant={'solid'}
                    bg={'#80bC00'}
                    _hover={{ bg: '#99c932' }}
                    color="#fff"
                  >
                    Verify
                  </Button>
                </HStack>
              </VStack>
            </form>
          )}
        </Stack>
      </Flex>

      <Flex
        display={{ base: 'none', md: 'flex' }}
        flex={1}
        justify="center"
        align="center"
        bg="#3182CE"
        borderBottomLeftRadius={'400px'}
        bgGradient={['linear(to-r, #54BFE9, #3182CE)']}
      >
        <Image
          src={'/assets/img/systems-hub-logo-1207x421.webp'}
          width={600}
          height={210}
          alt="Systems Hub Logo"
          blurDataURL="/assets/img/systems-hub-logo-1207x421.webp"
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </Flex>
    </Stack>
  );
};

export default SignInForm;
