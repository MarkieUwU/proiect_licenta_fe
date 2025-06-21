import { PostStatus } from '@/modules/Posts/models/post.models';

export interface GetAdminPostsParams {
  search?: string;
  status?: PostStatus;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
