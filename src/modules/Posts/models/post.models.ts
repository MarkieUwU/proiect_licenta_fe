import { UserComment } from './comment.models';
import { Like } from './like.models';
import { User } from '../../Profile/models/user.models';
import { ContentStatus } from '@/core/models/content-status.enum';

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
  status: ContentStatus;
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
  status: ContentStatus;
  user: { fullName?: string, username?: string, profileImage?: string };
  createdAt: string;
  updatedAt: string;
  comments: number;
  likes: number;
}
