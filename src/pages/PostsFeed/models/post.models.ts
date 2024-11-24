import { UserComment } from "./comment.models";
import { Like } from "./like.models";
import { User } from "../../ProfilePage/models/user.models";

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  comments: UserComment[];
  likes: Like[];
  user: User;
};

export type PostRequest = {
  content: string;
};
