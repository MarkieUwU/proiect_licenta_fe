import apiClient from '@/assets/config';
import { apiErrorHandler } from '@/core/utils/utils';
import { Role } from '@/modules/Profile/models/role.enum';
import { DashboardStatsData } from '../models/dashboard.models';
import { UsersResponse } from '../models/user.models';
import { PostReportsResponse } from '../models/posts.models';
import { ContentStatus } from '@/core/models/content-status.enum';
import {
  AdminCommentsResponse,
  CommentReportsResponse,
} from '../models/comments.models';
import { AdminPostsResponse } from '../models/posts.models';
import {
  CommentReportsPaginatedRequest,
  CommentsPaginatedRequest,
  PostReportsPaginatedRequest,
  PostsPaginatedRequest,
  UsersPaginatedRequest,
} from '../models/paginated-requests.models';

export const getDashboardStats = apiErrorHandler<DashboardStatsData>(
  async () => {
    const { data } = await apiClient.get('/admin/dashboard/stats');
    return data;
  }
);

export const getUsers = apiErrorHandler<UsersResponse>(
  async (params: UsersPaginatedRequest) => {
    const { data } = await apiClient.get('/admin/users', { params });
    return data;
  }
);

export const updateUserRole = apiErrorHandler(
  async ({ userId, role }: { userId: string; role: Role }) => {
    const { data } = await apiClient.patch(`/admin/users/${userId}/role`, {
      role,
    });
    return data;
  }
);

export const getAdminPosts = apiErrorHandler<AdminPostsResponse>(
  async (params: PostsPaginatedRequest) => {
    const { data } = await apiClient.get('/admin/posts', {
      params,
    });
    return data;
  }
);

export const updatePostStatus = apiErrorHandler<any>(
  async (id: number, status: ContentStatus) => {
    const { data } = await apiClient.patch(`/admin/posts/${id}/status`, {
      status,
    });
    return data;
  }
);

export const getAdminComments = apiErrorHandler<AdminCommentsResponse>(
  async (params: CommentsPaginatedRequest) => {
    const { data } = await apiClient.get('/admin/comments', {
      params,
    });
    return data;
  }
);

export const updateCommentStatus = apiErrorHandler<any>(
  async (id: number, status: ContentStatus) => {
    const { data } = await apiClient.patch(`/admin/comments/${id}/status`, {
      status,
    });
    return data;
  }
);

export const getAllPostReports = apiErrorHandler<PostReportsResponse>(
  async (params: PostReportsPaginatedRequest) => {
    const { data } = await apiClient.get('/admin/reports/posts', { params });
    return data;
  }
);

export const getAllCommentReports = apiErrorHandler<CommentReportsResponse>(
  async (params: CommentReportsPaginatedRequest) => {
    const { data } = await apiClient.get('/admin/reports/comments', { params });
    return data;
  }
);
