import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { UserComment, CommentRequest } from '../models/comment.models';

export const createComment = apiErrorHandler<UserComment>(
  async ({ postId, commentRequest }: { postId: number; commentRequest: CommentRequest }) => {
    const { data } = await apiClient.post(`/comment/${postId}`, commentRequest);
    return data;
  }
);

export const getPostComments = apiErrorHandler<UserComment[]>(
  async (postId: number) => {
    const { data } = await apiClient.get(`/comment/${postId}`);
    return data;
  }
);

export const getPostCommentsByUser = apiErrorHandler<UserComment[]>(
  async ({ postId, userId }: { postId: number; userId: number }) => {
    return await apiClient.get(`/post/comment/${postId}/${userId}`);
  }
);

export const updateComment = apiErrorHandler<UserComment>(
  async ({ id, text }: { id: number; text: string }) => {
    const { data } = await apiClient.put(`/comment/${id}`, { text });
    return data;
  }
);

export const deleteComment = apiErrorHandler(async (commentId: number) => {
  const { data } = await apiClient.delete(`/comment/${commentId}`);
  return data;
});
