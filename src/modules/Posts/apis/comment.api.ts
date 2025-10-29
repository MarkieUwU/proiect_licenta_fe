import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { UserComment, CommentRequest } from '../models/comment.models';

export const createComment = apiErrorHandler<UserComment>(
  async ({ postId, commentRequest }: { postId: string; commentRequest: CommentRequest }) => {
    const { data } = await apiClient.post(`/comment/${postId}`, commentRequest);
    return data;
  }
);

export const getPostComments = apiErrorHandler<UserComment[]>(
  async (postId: string) => {
    const { data } = await apiClient.get(`/comment/${postId}`);
    return data;
  }
);

export const getPostCommentsByUser = apiErrorHandler<UserComment[]>(
  async ({ postId, userId }: { postId: string; userId: string }) => {
    return await apiClient.get(`/post/comment/${postId}/${userId}`);
  }
);

export const updateComment = apiErrorHandler<UserComment>(
  async ({ id, text }: { id: string; text: string }) => {
    const { data } = await apiClient.put(`/comment/${id}`, { text });
    return data;
  }
);

export const deleteComment = apiErrorHandler(async (commentId: string) => {
  const { data } = await apiClient.delete(`/comment/${commentId}`);
  return data;
});
