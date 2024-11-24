import { User } from "../../ProfilePage/models/user.models";
import { Post } from "./post.models";

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
  userId: number;
};
