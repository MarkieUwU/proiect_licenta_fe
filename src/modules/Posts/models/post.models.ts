import { UserComment } from './comment.models';
import { Like } from './like.models';
import { User } from '../../Profile/models/user.models';

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
