import { createContext } from 'react';
import { LoggedUser } from '../models/user.models';

const initialState = {
  loggedUser: {} as LoggedUser,
  updateLoggedUser: () => null
}

export const LoggedUserStateContext = createContext<{ loggedUser: LoggedUser, updateLoggedUser: (user: LoggedUser) => void}>(initialState);
