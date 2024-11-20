import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post, PostRequest } from "../models/post.models";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostComments,
  getPostLikes,
  updatePost,
} from "../apis/post.api";
import { usersList } from "@/pages/ProfilePage/hooks/user.hooks";

export const postsList: Post[] = [
  {
    id: "0",
    title: "Shocker",
    content: "You won't believe what just hapened to me!",
    createdAt: "0982",
    updatedAt: "213",
    userId: "1",
    comments: [],
    likes: [],
    user: usersList[0],
  },
  {
    id: "1",
    title: "What is Lorem Ipsum?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    createdAt: "0982",
    updatedAt: "213",
    userId: "1",
    comments: [],
    likes: [],
    user: usersList[1],
  },
  {
    id: "2",
    title: "This should be an explanation for what Lorem Ipsum is",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    createdAt: "0982",
    updatedAt: "213",
    userId: "1",
    comments: [],
    likes: [],
    user: usersList[1],
  },
];

export const useGetAllPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};

export const useGetPostById = (id: string) => {
  return useQuery<Post>({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });
};

export const useGetPostComments = (id: string) => {
  return useQuery<Post[]>({
    queryKey: ["posts", id],
    queryFn: () => getPostComments(id),
  });
};

export const useGetPostLikes = (id: string) => {
  return useQuery<Post[]>({
    queryKey: ["posts", id],
    queryFn: () => getPostLikes(id),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      postRequest,
    }: {
      userId: string;
      postRequest: PostRequest;
    }) => createPost(userId, postRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      postRequest,
    }: {
      id: string;
      postRequest: PostRequest;
    }) => updatePost(id, postRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
