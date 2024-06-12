import { useQuery } from "@tanstack/react-query";
import { User } from "../type/user";

export const useUserApi = () => {
  const response = useQuery<User[]>({
    queryKey: ["allUsers"],
    queryFn: () =>
      fetch("http://localhost:8000/user").then((res) => res.json()),
  });

  return response;
};
