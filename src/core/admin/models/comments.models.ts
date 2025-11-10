import { ContentStatus } from '@/core/models/content-status.enum';

export interface AdminComment {
  id: string;
  text: string;
  createdAt: string;
  status: ContentStatus;
  userUsername: string;
  userProfileImage: string;
  postId: string;
}

export interface AdminCommentsResponse {
  comments: AdminComment[];
  total: number;
}

export interface CommentReport {
  id: string;
  reason: string;
  createdAt: string;
  commentText: string;
  commentAuthor: string;
  reporter: string;
}

export interface CommentReportsResponse {
  reports: CommentReport[];
  total: number;
  pages: number;
}
