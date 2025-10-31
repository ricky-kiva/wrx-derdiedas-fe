import z from 'zod';

export const GenderEnum = z.enum(['masculine', 'feminine', 'neuter']);
export const ResponseStatusEnum = z.enum(['success', 'fail', 'error']);
