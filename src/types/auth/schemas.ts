import z from 'zod';

export const LoginPayloadSchema = z.object({
  googleIdToken: z.string().min(1, "googleIdToken is required")
});

export const LogoutPayloadSchema = z.object({
  id: z.string().min(1, "id of user is required")
});
