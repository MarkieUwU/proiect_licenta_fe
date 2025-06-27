import { ContentStatus } from '@/core/models/content-status.enum';

export interface AdminComment {
  id: string;
  text: string;
  createdAt: string;
  status: ContentStatus;
  user: { id: string; username: string; profileImage?: string };
  post: { id: string; title: string };
  reports: Array<{
    id: string;
    user: { username: string };
    [key: string]: any;
  }>;
}

export interface AdminCommentsRequest {
  search?: string;
  status?: ContentStatus;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface AdminCommentsResponse {
  comments: AdminComment[];
  total: number;
}

export interface CommentReport {
  id: number;
  reason: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
  comment: {
    id: number;
    text: string;
    user: {
      id: number;
      username: string;
      fullName: string;
    };
    post: {
      id: number;
      title: string;
    };
  };
}

export interface CommentReportsResponse {
  reports: CommentReport[];
  total: number;
  pages: number;
}
