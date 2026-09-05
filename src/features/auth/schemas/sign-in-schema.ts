import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().email('올바른 이메일 주소를 입력해 주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export type SignInValues = z.infer<typeof signInSchema>;
