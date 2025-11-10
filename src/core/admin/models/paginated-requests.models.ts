import { ContentStatus } from '@/core/models/content-status.enum';

export type UsersSortField = 'id' | 'username' | 'fullName' | 'email' | 'role';
export type PostsSortField =
  | 'id'
  | 'title'
  | 'status'
  | 'createdAt'
  | 'updatedAt';
export type PostReportsSortField =
  | 'id'
  | 'postTitle'
  | 'authorUsername'
  | 'reporter'
  | 'reason'
  | 'createdAt';
export type CommentSortField =
  | 'id'
  | 'text'
  | 'status'
  | 'createdAt'
  | 'postId';
export type CommentReportsSortField =
  | 'id'
  | 'commentContent'
  | 'authorUsername'
  | 'reporter'
  | 'reason'
  | 'createdAt';

export type OrderBy = 'asc' | 'desc';

export type PaginationCriteria<T> = {
  page: number;
  size: number;
  sort: T;
  order: OrderBy;
};

export type UsersPaginatedRequest = PaginationCriteria<UsersSortField> & {
  search: string;
};

export type PostsPaginatedRequest = PaginationCriteria<PostsSortField> & {
  search: string;
  status: ContentStatus;
};

export type PostReportsPaginatedRequest =
  PaginationCriteria<PostReportsSortField> & {
    postId: string;
    postTitle: string;
    postAuthor: string;
    reporter: string;
  };

export type CommentsPaginatedRequest = PaginationCriteria<CommentSortField> & {
  commentText: string;
  postTitle: string;
  authorUsername: string;
  status: ContentStatus;
};

export type CommentReportsPaginatedRequest =
  PaginationCriteria<CommentReportsSortField> & {
    commentId: string;
    commentText: string;
    commentAuthor: string;
    reporter: string;
  };
