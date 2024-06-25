import { UserComment } from "./comment";
import { Like } from "./like";
import { User } from "./user";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  comments: UserComment[];
  likes: Like[];
  user: User;
};

export type PostRequest = {
  content: string;
};
