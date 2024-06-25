import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { User } from "../type/user";
import {
  deleteUser,
  getUsersList,
  getFilteredUsers,
  getUserData,
  getUserPosts,
} from "../api/user.api";
import { Post } from "../type/post";

export const useGetUsersList = (nrOfUsers?: number) => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getUsersList(nrOfUsers),
  });
};

export const useInfiniteFilteredUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: () => getFilteredUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
};

export const useGetUserData = ({
  id,
  username,
}: {
  id?: number;
  username?: string;
}) => {
  return useQuery<User>({
    queryKey: ["users"],
    queryFn: () => getUserData({ id, username }),
  });
};

export const useGetUserPosts = (id: string) => {
  return useQuery<Post[]>({
    queryKey: ["users", id],
    queryFn: () => getUserPosts(id),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
