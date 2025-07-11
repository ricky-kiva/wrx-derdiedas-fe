import z from 'zod';
import { GenderEnum, ResponseStatusEnum } from './enums';

export const NounSchema = z.object({
  id: z.string(),
  word: z.string(),
  gender: GenderEnum,
  meanings: z.array(z.string())
});

export const SearchNounItemSchema = z.object({
  item: NounSchema,
  score: z.number()
});

export const SearchNounResponseSchema = z.object({
  status: ResponseStatusEnum,
  data: z.array(SearchNounItemSchema)
});
