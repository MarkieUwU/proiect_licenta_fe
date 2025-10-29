import { UserComment } from './comment.models';
import { Like } from './like.models';
import { UserDetails } from '../../Profile/models/user.models';
import { ContentStatus } from '@/core/models/content-status.enum';

export type Post = {
  id: string;
  title: string;
  image: string;
  content: string;
  createdAt: string;
  userId: string;
  comments: UserComment[];
  likes: Like[];
  user: UserDetails;
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
  id: string;
  title: string;
  content: string;
  status: ContentStatus;
  user: { fullName?: string, username?: string, profileImage?: string };
  createdAt: string;
  updatedAt: string;
  comments: number;
  likes: number;
}
