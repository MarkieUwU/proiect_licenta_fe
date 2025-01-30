import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { Like } from '../models/like.models';

export const getAllLikes = apiErrorHandler<Like[]>(
  async () => {
    const { data } = await apiClient.get('/like/all');
    return data;
  }
)

export const getIfAlreadyLiked = async (postId: number, userId: number) => {
  const { data } = await apiClient.get(`/like/${userId}`, {
    params: { postId },
  });
  return data;
};

export const likeAPost = apiErrorHandler(
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
