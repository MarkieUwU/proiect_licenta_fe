import { User } from '../../Profile/models/user.models';
import { Post } from './post.models';

export type Like = {
  id: number;
  createdAt: string;
  userId: number;
  postId: number;
  post: Post;
  user: User;
};
