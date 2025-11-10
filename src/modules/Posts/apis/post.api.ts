import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { Post, PostRequest } from '../models/post.models';

export const getFilteredPosts = apiErrorHandler<Post[]>(
  async ( userId: string ) => {
    const { data } = await apiClient.post('/post/filter', { userId});
    return data;
  }
);

export const createPost = apiErrorHandler(
  async ({ id, postRequest }: { id: string; postRequest: PostRequest }) => {
    const { data } = await apiClient.post(`/post/${id}`, postRequest);
    return data;
  }
);

export const updatePost = apiErrorHandler(
  async ({ id, postRequest }: { id: string; postRequest: PostRequest }) => {
    const { data } = await apiClient.put(`/post/${id}`, postRequest);
    return data;
  }
);

export const deletePost = apiErrorHandler(async (id: string) => {
  const { data } = await apiClient.delete(`/post/${id}`);
  return data;
});
