import apiClient from "../assets/config";
import { CommentRequest } from "../type/comment";

export const createComment = async (
  postId: string,
  commentRequest: CommentRequest
) => {
  console.log(postId);
  const { data } = await apiClient.post(`/comment/${postId}`, commentRequest);
  return data;
};

export const getPostComments = async (postId: string) => {
  const { data } = await apiClient.get(`/post/comments/${postId}`);
  return data;
};

export const deleteComment = async (commentId: string) => {
  const { data } = await apiClient.delete(`/comment/${commentId}`);
  return data;
};
