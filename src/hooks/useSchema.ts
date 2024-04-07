/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(5, '아이디는 최소 5자리 입니다'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요')
    .max(30, '비밀번호는 최대 30자 입니다'),
});

export const requiredLogin = loginSchema.required({
  username: true,
  password: true,
});
