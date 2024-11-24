import apiClient from "../../../assets/config";
import { CommentRequest } from "../models/comment.models";

export const createComment = async (
  postId: number,
  commentRequest: CommentRequest
) => {
  const { data } = await apiClient.post(`/comment/${postId}`, commentRequest);
  return data;
};

export const getPostComments = async (postId: number) => {
  const { data } = await apiClient.get(`/post/comments/${postId}`);
  return data;
};

export const getUserPostComment = async (postId: number, userId: number) => {
  return await apiClient.get(`/post/comment/${postId}/${userId}`);
};

export const deleteComment = async (commentId: number) => {
  const { data } = await apiClient.delete(`/comment/${commentId}`);
  return data;
};
