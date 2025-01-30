import { useState } from "react"
import { LoggedUser } from "../models/user.models"

export const useLoggedUserState = (initialUser?: LoggedUser | (() => LoggedUser)) => {
  const [loggedUser, setLoggedUser] = useState(initialUser);

  return { loggedUser, updateLoggedUser: setLoggedUser };
}