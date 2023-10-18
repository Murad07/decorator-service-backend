import { z } from 'zod';
import { User } from './user.model';

const createUserZodSchema = z
  .object({
    body: z
      .object({
        password: z.string().optional(),
        email: z.string({
          required_error: 'Email is required',
        }),
      })
      .refine(value => isUniqueemail(value.email), {
        message: 'Email already exists',
        path: ['body', 'email'],
      }),
  })
  .refine(value => Object.keys(value.body).length > 0, {
    message: 'Request body is empty',
    path: ['body'],
  });

const updaeUserZodSchema = z
  .object({
    body: z
      .object({
        password: z.string().optional(),

        name: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .optional(),
      })
      .optional(),
  })
  .refine(value => Object.keys(value.body ?? {}).length > 0, {
    message: 'Request body is empty',
    path: ['body'],
  });

export const UserValidation = {
  createUserZodSchema,
  updaeUserZodSchema,
};

async function isUniqueemail(email: string) {
  const user = await User.findOne({ email });
  return user === null;
}
