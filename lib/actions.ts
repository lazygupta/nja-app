'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticateAdmin(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    // NextAuth will handle redirect using `redirectTo` from formData
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid admin credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
