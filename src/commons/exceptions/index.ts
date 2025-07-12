import axios from 'axios';

export function parseErrorMessage(e: unknown): string {
  const message = "Oops! That didn't work. Try again?";

  if (axios.isAxiosError(e)) {
    return e.response?.data?.message || e.message || message;
  }

  if (typeof e === 'string') return e;
  if (e instanceof Error) return e.message;

  return message;
}
