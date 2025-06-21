import { CommentStatus } from "@/modules/Posts/models/comment.models";

export interface AdminComment {
  id: string;
  content: string;
  createdAt: string;
  status: CommentStatus;
  user: { id: string; username: string; profileImage?: string };
  post: { id: string; title: string };
  reports: { id: string }[];
};

export interface AdminCommentsRequest {
  search?: string;
  status?: CommentStatus;
  page?: number;
  pageSize?: number;
};
