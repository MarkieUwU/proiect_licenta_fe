import apiClient from '@/assets/config';
import { apiErrorHandler } from '@/core/utils/utils';

export const reportPost = apiErrorHandler(async (postId: number, reason: string) => {
  const { data } = await apiClient.post(`/report/post/${postId}`, { reason });
  return data;
});

export const reportComment = apiErrorHandler(async (commentId: number, reason: string) => {
  const { data } = await apiClient.post(`/report/comment/${commentId}`, { reason });
  return data;
}); 