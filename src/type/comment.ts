import { Post } from "./post";
import { User } from "./user";

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
};

export type CommentRequest = {
  author: string;
  text: string;
  userId: string;
};
