import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const getInitials = (name: string): string => {
  let words: string[] = name.split(/[ .\-_]/g);
  let initials = '';

  if (!words?.length) return initials;

  words = words.slice(0, 2);

  words.forEach((name) => {
    initials += name.at(0)?.toUpperCase();
  });

  return initials;
};

export const apiErrorHandler =
  <T>(apiFn: any, errorMessage?: string) =>
  async (...args: any[]): Promise<T> => {
    try {
      return await apiFn(...args);
    } catch (e) {
      const error = (e as AxiosError).response?.data as any;
      const message = errorMessage ?? error.message;
      toast.error(message);
      throw error;
    }
  };
