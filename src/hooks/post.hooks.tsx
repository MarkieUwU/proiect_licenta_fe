import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post, PostRequest } from "../type/post";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostComments,
  getPostLikes,
  updatePost,
} from "../api/post.api";

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
