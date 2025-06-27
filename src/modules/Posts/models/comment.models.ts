import { ContentStatus } from '@/core/models/content-status.enum';
import { User } from '../../Profile/models/user.models';
import { Post } from './post.models';

export type UserComment = {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  isEdited?: boolean;
  postId: number;
  userId: number;
  post: Post;
  user: User;
  status: ContentStatus;
};

export type CommentRequest = {
  text: string;
  userId: number;
};
