import { z } from 'zod';

export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([
    z.object({
      status: z.literal('success'),
      data: dataSchema,
    }),
    z.object({
      status: z.union([z.literal('fail'), z.literal('error')]),
      message: z.string(),
    }),
  ]);

export const ApiResponseSchema = createApiResponseSchema(z.unknown());
