import apiClient from "../assets/config";
import { PostRequest } from "../type/post";

export const getAllPosts = async () => {
  const { data } = await apiClient.get("/post");
  return data;
};

export const getPostById = async (id: string) => {
  const { data } = await apiClient.get(`/post/${id}`);
  return data;
};

export const getPostComments = async (id: string) => {
  const { data } = await apiClient.get(`/post/comments/${id}`);
  return data;
};

export const getPostLikes = async (id: string) => {
  const { data } = await apiClient.get(`/post/likes/${id}`);
  return data;
};

export const createPost = async (userId: string, request: PostRequest) => {
  const { data } = await apiClient.post(`/post/${userId}`, request);
  return data;
};

export const updatePost = async (id: string, request: PostRequest) => {
  const { data } = await apiClient.put(`/post/${id}`, request);
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await apiClient.delete(`/post/${id}`);
  return data;
};

export const allPosts = () => {};
