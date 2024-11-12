import { z, ZodType } from 'zod'

type Schema = ZodType<string, any>;

export const password: Schema = z.string().min(8)

export const login: Schema = z.string().min(4)