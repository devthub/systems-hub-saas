import { FormikHelpers } from 'formik';

export type IFormikOnSubmitFn<Values, ReturnType = void> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>
) => Promise<ReturnType | null>;
