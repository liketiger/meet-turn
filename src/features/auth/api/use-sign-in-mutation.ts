import { mockSignIn } from '@/features/auth/api/mock-sign-in';
import { useMutation } from '@tanstack/react-query';

export function useSignInMutation() {
  return useMutation({ mutationFn: mockSignIn });
}
