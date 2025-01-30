import { LoggedUser } from '@/modules/Profile/models/user.models';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';

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

  export const toBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  export const decodeToken = (token: string): LoggedUser => {
    const decodedValue = jwtDecode(token) as any;

    const loggedUser = Object.assign<LoggedUser, LoggedUser>({} as LoggedUser, {
      id: decodedValue.id,
      fullName: decodedValue.fullName,
      username: decodedValue.username,
      email: decodedValue.email,
      theme: decodedValue.theme,
      language: decodedValue.language
    });

    return loggedUser;
  }
