import { LoggedUser } from '@/modules/Profile/models/user.models';
import { createContext } from 'react';

export const LoggedUserContext = createContext({} as LoggedUser);
