import { FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from '@chakra-ui/react';
import { FormikProps } from 'formik';

import { isEmpty } from '@/lib/utils/common';

export interface ICustomInputFormControlProps<FormValues> {
  isRequired?: boolean;
  formikProps: FormikProps<FormValues>;
  name: keyof FormValues;
  label: string;
  type: string;
  isNotEditable?: boolean;
  placeholder?: string | null;
  autoFocus?: boolean;
  inputRef?: React.MutableRefObject<null>;
}

export const CustomInputFormControl = <FormValues,>({
  isRequired = false,
  formikProps,
  name,
  label,
  type,
  isNotEditable,
  placeholder = null,
  autoFocus = false,
  inputRef,
}: ICustomInputFormControlProps<FormValues>) => (
  <FormControl
    isRequired={isRequired}
    isInvalid={!!(formikProps.errors[name] && formikProps.touched[name])}
    isDisabled={formikProps.isSubmitting || isNotEditable}
  >
    <FormLabel htmlFor={String(name)}>{label}</FormLabel>
    <Input
      ref={inputRef}
      type={type}
      name={String(name)}
      id={String(name)}
      value={String(formikProps.values[name])}
      onChange={formikProps.handleChange}
      onBlur={formikProps.handleBlur}
      size="md"
      placeholder={placeholder || ''}
      autoFocus={autoFocus}
    />
    {formikProps.errors[name] && formikProps.touched[name] && (
      <FormErrorMessage fontSize="xs">{String(formikProps.errors[name])}</FormErrorMessage>
    )}
  </FormControl>
);

export const CustomTextAreaFormControl = <FormValues,>({
  isRequired = false,
  formikProps,
  name,
  label,
  isNotEditable,
}: ICustomInputFormControlProps<FormValues>) => (
  <FormControl
    isRequired={isRequired}
    isInvalid={!!(formikProps.errors[name] && formikProps.touched[name])}
    isDisabled={formikProps.isSubmitting || isNotEditable}
  >
    <FormLabel htmlFor={String(name)}>{label}</FormLabel>
    <Textarea
      id={String(name)}
      name={String(name)}
      onChange={formikProps.handleChange}
      onBlur={formikProps.handleBlur}
      value={formikProps.values[name] as string}
    />
    {formikProps.errors[name] && formikProps.touched[name] && (
      <FormErrorMessage fontSize="xs">{String(formikProps.errors[name])}</FormErrorMessage>
    )}
  </FormControl>
);

export interface DefaultSelectType {
  value: string;
  label: string;
}
export interface ICustomSelectCurrencyFormControlProps<FormValues> {
  name: keyof FormValues;
  formikProps: FormikProps<FormValues>;
  options: DefaultSelectType[];
}

export const CustomSelectCurrencyFormControl = <FormValues,>({
  name,
  formikProps,
  options,
}: ICustomSelectCurrencyFormControlProps<FormValues>) => {
  return (
    <FormControl
      py={3}
      isRequired
      isInvalid={!!(formikProps.errors[name] && formikProps.touched[name])}
      isDisabled={formikProps.isSubmitting}
    >
      <FormLabel>Currency</FormLabel>
      <Select
        id={name as string}
        name={name as string}
        onChange={formikProps.handleChange}
        placeholder="Select currency."
        value={formikProps.values[name] as keyof DefaultSelectType}
      >
        {options.map((opt, indx) => (
          <option key={`${indx} - ${opt.label}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      {formikProps.errors[name] && (
        <FormErrorMessage fontSize="xs">{String(formikProps.errors[name])}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export interface DefaultSelectOptionType {
  value: string;
  text: string;
}
export interface ICustomSelectFormControlProps<FormValues> {
  name: keyof FormValues;
  formikProps: FormikProps<FormValues>;
  options: DefaultSelectOptionType[];
  isRequired?: boolean;
  label: string;
  isNotEditable?: boolean;
}
export const CustomSelectFormControl = <FormValues,>({
  isRequired = false,
  formikProps,
  name,
  label,
  isNotEditable,
  options = [],
}: ICustomSelectFormControlProps<FormValues>) => (
  <FormControl
    isRequired={isRequired}
    isInvalid={!!(formikProps.errors[name] && formikProps.touched[name])}
    isDisabled={formikProps.isSubmitting || isNotEditable}
  >
    <FormLabel htmlFor="name">{label}</FormLabel>

    <Select placeholder="Select option" onChange={formikProps.handleChange} name={name as string}>
      {!isEmpty(options) &&
        options.map((option, indx) => (
          <option key={`${option.value}-${indx}`} value={option.value}>
            {option.text}
          </option>
        ))}
    </Select>

    {formikProps.errors[name] && formikProps.touched[name] && (
      <FormErrorMessage fontSize="xs">{String(formikProps.errors[name])}</FormErrorMessage>
    )}
  </FormControl>
);
