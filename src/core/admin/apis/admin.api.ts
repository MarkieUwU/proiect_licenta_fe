import apiClient from '@/assets/config';
import { apiErrorHandler } from '@/core/utils/utils';
import { Role } from '@/modules/Profile/models/role.enum';
import { DashboardStatsData } from '../models/dashboard.models';
import { UsersResponse } from '../models/user.models';
import { GetAdminPostsParams } from '../models/posts.models';
import { PostStatus } from '@/modules/Posts/models/post.models';
import { AdminComment, AdminCommentsRequest } from '../models/comments.models';
import { CommentStatus } from '@/modules/Posts/models/comment.models';

export const getDashboardStats = apiErrorHandler<DashboardStatsData>(async () => {
  const { data } = await apiClient.get('/admin/dashboard/stats');
  return data;
});

export const getUsers = apiErrorHandler<UsersResponse>(async (params: { 
  page?: number; 
  limit?: number; 
  search?: string 
}) => {
  const { data } = await apiClient.get('/admin/users', { params });
  return data;
});

export const updateUserRole = apiErrorHandler(async ({userId, role}: {userId: number, role: Role}) => {
  const { data } = await apiClient.patch(`/admin/users/${userId}/role`, { role });
  return data;
});

export const getAdminPosts = apiErrorHandler<any>(
  async ({ search, status, sort, order, page, limit }: GetAdminPostsParams) => {
    const { data } = await apiClient.get('/admin/posts', {
      params: { search, status, sort, order, page, limit }
    });
    return data;
  }
);

export const updatePostStatus = apiErrorHandler<any>(
  async (id: number, status: PostStatus) => {
    const { data } = await apiClient.patch(`/admin/posts/${id}/status`, { status });
    return data;
  }
);

export const getAdminComments = apiErrorHandler<AdminComment[]>(
  async ({ search, status, page, pageSize }: AdminCommentsRequest) => {
    const { data } = await apiClient.get('/admin/comments', {
      params: { search, status, page, pageSize }
    });
    return data;
  }
);

export const updateCommentStatus = apiErrorHandler<any>(
  async (id: number, status: CommentStatus) => {
    const { data } = await apiClient.patch(`/admin/comments/${id}/status`, { status });
    return data;
  }
);
