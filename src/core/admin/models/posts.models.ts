import { ContentStatus } from '@/core/models/content-status.enum';

export interface GetAdminPostsParams {
  search?: string;
  status?: ContentStatus;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface AdminPost {
  id: number;
  title: string;
  content: string;
  status: ContentStatus;
  user: { fullName?: string };
  createdAt: string;
  updatedAt: string;
  comments: number;
  likes: number;
}

export interface AdminPostsResponse {
  posts: AdminPost[];
  total: number;
  pages: number;
}

export interface PostReport {
  id: number;
  reason: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
  post: {
    id: number;
    title: string;
    content: string;
    user: {
      id: number;
      username: string;
      fullName: string;
    };
  };
}

export interface PostReportsResponse {
  reports: PostReport[];
  total: number;
  pages: number;
}
