import type { SignInValues } from '@/features/auth/schemas/sign-in-schema';
import type { AuthSession } from '@/features/auth/types';

export const DEMO_CREDENTIALS = {
  email: 'demo@meet-turn.app',
  password: 'password123',
} as const;

const MOCK_DELAY_MS = 500;

export async function mockSignIn({ email, password }: SignInValues): Promise<AuthSession> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  if (email !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  return {
    user: {
      id: 'demo-user',
      email,
    },
  };
}
