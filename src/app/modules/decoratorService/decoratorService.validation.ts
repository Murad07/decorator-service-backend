import { z } from 'zod';

const createDecoratorServiceZodSchema = z.object({
  body: z.object({
    title: z.string(),
    price: z.number(),
    category: z.string(),
    location: z.string(),
    serviceStatus: z.string(),
  }),
});

const updateDecoratorServiceZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.string().optional(),
    category: z.string().optional(),
    location: z.string().optional(),
    serviceStatus: z.string().optional(),
  }),
});

export const DecoratorServiceValidaion = {
  createDecoratorServiceZodSchema,
  updateDecoratorServiceZodSchema,
};
