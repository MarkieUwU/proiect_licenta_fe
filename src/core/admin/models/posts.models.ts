import { ContentStatus } from '@/core/models/content-status.enum';

export interface AdminPost {
  id: string;
  title: string;
  content: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  userUsername: string;
  userProfileImage: string;
  comments: number;
  likes: number;
}

export interface AdminPostsResponse {
  posts: AdminPost[];
  total: number;
  pages: number;
}

export interface PostReport {
  id: string;
  reason: string;
  createdAt: Date;
  postTitle: string;
  postAuthor: string;
  reporter: string;
}

export interface PostReportsResponse {
  reports: PostReport[];
  total: number;
  pages: number;
}
