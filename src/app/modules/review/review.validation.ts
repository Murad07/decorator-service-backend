import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    decoratorService: z.string(),
    reviewText: z.string(),
    rating: z.number(),
  }),
});

export const ReviewValidaion = {
  createReviewZodSchema,
};
