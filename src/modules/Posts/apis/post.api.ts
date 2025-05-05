import { apiErrorHandler } from '@/core/utils/utils';
import apiClient from '../../../assets/config';
import { Post, PostRequest, PostSortCriteria } from '../models/post.models';

export const getAllPosts = apiErrorHandler<Post[]>(async () => {
  const { data } = await apiClient.get('/post');
  return data;
});

export const getFilteredPosts = apiErrorHandler<Post[]>(
  async ({sortCriteria, userId}: { sortCriteria: PostSortCriteria | PostSortCriteria[], userId: number}) => {
    const { data } = await apiClient.post('/post/filter', { sortCriteria, userId});
    return data;
  }
);

export const createPost = apiErrorHandler(
  async ({ id, postRequest }: { id: number; postRequest: PostRequest }) => {
    const { data } = await apiClient.post(`/post/${id}`, postRequest);
    return data;
  }
);

export const updatePost = apiErrorHandler(
  async ({ id, postRequest }: { id: number; postRequest: PostRequest }) => {
    const { data } = await apiClient.put(`/post/${id}`, postRequest);
    return data;
  }
);

export const deletePost = async (id: number) => {
  const { data } = await apiClient.delete(`/post/${id}`);
  return data;
};

export const getTopPostsByLikes = apiErrorHandler<Post[]>(
  async () => {
    const { data } = await apiClient.get('/post/top/likes');
    return data;
  }
)
