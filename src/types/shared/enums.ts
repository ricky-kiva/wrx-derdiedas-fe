import z from 'zod';

export const GenderEnum = z.enum(['masculine', 'feminine', 'neuter']);
