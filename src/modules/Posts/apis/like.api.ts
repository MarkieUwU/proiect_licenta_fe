import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { Like } from '../models/like.models';

export const likeAPost = apiErrorHandler<Like>(
  async ({ userId, postId }: { userId: number; postId: number }) => {
    const { data } = await apiClient.post('/like', { userId, postId });
    return data;
  }
);

export const unlikeAPost = apiErrorHandler(
  async ({ userId, postId }: { userId: number; postId: number }) => {
    const { data } = await apiClient.delete('/like', {
      params: { userId, postId },
    });
    return data;
  }
);
