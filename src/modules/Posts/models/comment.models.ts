import { User } from '../../Profile/models/user.models';
import { Post } from './post.models';

export enum CommentStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  REPORTED = 'REPORTED',
}

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
  status: CommentStatus;
};

export type CommentRequest = {
  text: string;
  userId: number;
};
