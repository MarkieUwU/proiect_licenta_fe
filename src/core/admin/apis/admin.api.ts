import apiClient from '@/assets/config';
import { apiErrorHandler } from '@/core/utils/utils';
import { Role } from '@/modules/Profile/models/role.enum';
import { DashboardStatsData } from '../models/dashboard.models';
import { UsersResponse } from '../models/user.models';
import { GetAdminPostsParams, PostReportsResponse } from '../models/posts.models';
import { ContentStatus } from '@/core/models/content-status.enum';
import { AdminCommentsRequest, AdminCommentsResponse, CommentReportsResponse } from '../models/comments.models';
import { AdminPostsResponse } from '../models/posts.models';

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

export const getAdminPosts = apiErrorHandler<AdminPostsResponse>(
  async ({ search, status, sort, order, page, limit }: GetAdminPostsParams) => {
    const { data } = await apiClient.get('/admin/posts', {
      params: { search, status, sort, order, page, limit }
    });
    return data;
  }
);

export const updatePostStatus = apiErrorHandler<any>(
  async (id: number, status: ContentStatus) => {
    const { data } = await apiClient.patch(`/admin/posts/${id}/status`, { status });
    return data;
  }
);

export const getAdminComments = apiErrorHandler<AdminCommentsResponse>(
  async ({ search, status, sort, order, page, pageSize }: AdminCommentsRequest) => {
    const { data } = await apiClient.get('/admin/comments', {
      params: { search, status, sort, order, page, pageSize }
    });
    return data;
  }
);

export const updateCommentStatus = apiErrorHandler<any>(
  async (id: number, status: ContentStatus) => {
    const { data } = await apiClient.patch(`/admin/comments/${id}/status`, { status });
    return data;
  }
);

export const getAllPostReports = apiErrorHandler<PostReportsResponse>(async (params?: {
  postId?: number;
  reporterId?: number;
  postTitle?: string;
  reporterUsername?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}) => {
  const { data } = await apiClient.get('/admin/reports/posts', { params });
  return data;
});

export const getAllCommentReports = apiErrorHandler<CommentReportsResponse>(async (params?: {
  commentId?: number;
  reporterId?: number;
  commentContent?: string;
  reporterUsername?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}) => {
  const { data } = await apiClient.get('/admin/reports/comments', { params });
  return data;
});

export const getCommentReports = apiErrorHandler(async (commentId: number) => {
  const { data } = await apiClient.get(`/admin/comments/${commentId}/reports`);
  return data;
});
