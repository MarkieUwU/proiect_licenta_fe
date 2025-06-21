import { UserComment } from './comment.models';
import { Like } from './like.models';
import { User } from '../../Profile/models/user.models';

export enum PostStatus {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  REPORTED = 'REPORTED',
}

export type Post = {
  id: number;
  title: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  comments: UserComment[];
  likes: Like[];
  user: User;
  status: PostStatus;
};

export type PostRequest = {
  title: string;
  image: string;
  content: string;
};

export type PostSortCriteria = {
  title?: 'desc' | 'asc';
  content?: 'desc' | 'asc';
  createdAt?: 'desc' | 'asc';
  updatedAt?: 'desc' | 'asc';
};

export interface AdminPost {
  id: number;
  title: string;
  content: string;
  status: PostStatus;
  user: { fullName?: string };
  createdAt: string;
  updatedAt: string;
  comments: number;
  likes: number;
}
