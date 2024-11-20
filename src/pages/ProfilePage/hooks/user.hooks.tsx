import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteUser,
  getUsersList,
  getFilteredUsers,
  getUserData,
  getUserPosts,
} from "../apis/user.api";
import { Post } from "../../PostsFeed/models/post.models";
import { User } from "../models/user.models";

export const usersList: User[] = [
  {
    id: "0",
    fullName: "Test Name",
    username: "test.name",
    email: "test.name@gmail.com",
    bio: "This is the bio of this user",
    createdAt: "123123",
    posts: [],
  },
  {
    id: "1",
    fullName: "Second Person",
    username: "second.person",
    email: "second.person@gmail.com",
    bio: "This is the bio of the second person",
    createdAt: "123123",
    posts: [],
  },
];

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
