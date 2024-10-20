import { UseFormReturn } from 'react-hook-form';

import { FormType } from '../timerInput';

export type ManualMethodProps = {
  form: UseFormReturn<FormType>;
  isOOO: boolean;
};
