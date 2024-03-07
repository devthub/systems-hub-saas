'use client';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import NextLink from 'next/link';
import { useState, useTransition } from 'react';

import { CustomInputFormControl } from '@/components/core/custom-form-controls/FormControls';
import { useAppContext } from '@/lib/contexts/App.context';
import { RegisterFormValues, registerInitialValues, registerSchema } from '@/lib/validation-schemas/register-schema';
import registerNewUser from '@/server-actions/user/register-new-user';
import { IFormikOnSubmitFn } from '@/types/formik-helpers';

const RegisterForm = () => {
  const { showToast } = useAppContext();
  const [isPending, startTransition] = useTransition();

  const [show, setShow] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSubmit: IFormikOnSubmitFn<RegisterFormValues> = async (values, formikProps) => {
    formikProps.setSubmitting(false);
  };

  const handleRegisterUser = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await registerNewUser(formData);

        showToast({
          status: 'success',
          title: 'Success!',
          description: 'Register successful!',
          position: 'top',
        });
      } catch (error) {
        console.error('🚀 ~ file: RegisterForm.tsx:69 ~ startTransition ~ error:', error);

        showToast({
          status: 'error',
          title: 'Register Failed!',
          description: (error as any).message,
          position: 'top',
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Create Account</Heading>
          <Text>Please fill out all the required fields. </Text>
          <form
            // onSubmit={formik.handleSubmit}
            action={handleRegisterUser}
          >
            <Stack spacing={4}>
              <CustomInputFormControl<RegisterFormValues>
                formikProps={formik}
                label="Username"
                name="username"
                isRequired={true}
                type="text"
              />

              <CustomInputFormControl<RegisterFormValues>
                formikProps={formik}
                label="Email"
                name="email"
                isRequired={true}
                type="text"
              />

              <FormControl id="password" isRequired isInvalid={!!formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    name="password"
                    rounded="md"
                    type={show ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.password || ''}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800'),
                      }}
                      onClick={handleClick}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.errors.password && (
                  <FormErrorMessage fontSize="xs">{String(formik.errors.password)}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="confirmPassword" isRequired isInvalid={!!formik.errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    name="confirmPassword"
                    rounded="md"
                    type={showConfirm ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword || ''}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      rounded="md"
                      bg={useColorModeValue('gray.300', 'gray.700')}
                      _hover={{
                        bg: useColorModeValue('gray.400', 'gray.800'),
                      }}
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.errors.confirmPassword && (
                  <FormErrorMessage fontSize="xs">{String(formik.errors.confirmPassword)}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <Stack spacing={6} mt={4}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Link as={NextLink} href={'/signin'} color={'blue.500'}>
                  Login
                </Link>
                {/* <Link color={'blue.500'}>Forgot password?</Link> */}
              </Stack>
              <Button
                loadingText="Signing in..."
                isLoading={formik.isSubmitting || isPending}
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

export default RegisterForm;
