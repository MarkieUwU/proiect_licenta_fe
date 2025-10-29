import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { Post, PostRequest, PostSortCriteria } from '../models/post.models';

export const getFilteredPosts = apiErrorHandler<Post[]>(
  async ({sortCriteria, userId}: { sortCriteria: PostSortCriteria | PostSortCriteria[], userId: string}) => {
    const { data } = await apiClient.post('/post/filter', { sortCriterias: sortCriteria, userId});
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
