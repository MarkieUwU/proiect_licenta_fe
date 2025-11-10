import { UserComment } from './comment.models';
import { Like } from './like.models';
import { UserDetails } from '../../Profile/models/user.models';

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
