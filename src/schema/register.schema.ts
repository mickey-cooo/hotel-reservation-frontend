import * as z from 'zod';

export const signUpSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .email({ message: t('auth.emailInvalid') })
      .min(1, { message: t('auth.emailRequire') }),
    password: z
      .string({ message: t('auth.passwordRequire') })
      .min(8, { message: t('auth.passwordInvalid') }),
    confirmPassword: z
      .string({ message: t('auth.confirmPasswordRequire') })
      .min(8, { message: t('auth.confirmPasswordInvalid') }),
  });
};
