import apiClient from "../../../assets/config";
import { PostRequest } from "../models/post.models";

export const getAllPosts = async () => {
  const { data } = await apiClient.get("/post");
  return data;
};

export const getPostById = async (id: number) => {
  const { data } = await apiClient.get(`/post/${id}`);
  return data;
};

export const getPostComments = async (id: number) => {
  const { data } = await apiClient.get(`/post/comments/${id}`);
  return data;
};

export const getPostLikes = async (id: number) => {
  const { data } = await apiClient.get(`/post/likes/${id}`);
  return data;
};

export const createPost = async (userId: number, request: PostRequest) => {
  const { data } = await apiClient.post(`/post/${userId}`, request);
  return data;
};

export const updatePost = async (id: number, request: PostRequest) => {
  const { data } = await apiClient.put(`/post/${id}`, request);
  return data;
};

export const deletePost = async (id: number) => {
  const { data } = await apiClient.delete(`/post/${id}`);
  return data;
};

export const allPosts = () => {};
