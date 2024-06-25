import { Post } from "./post";
import { User } from "./user";

export type Like = {
  id: number;
  createdAt: string;
  userId: number;
  postId: number;
  post: Post;
  user: User;
};
