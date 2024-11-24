import { Post } from "../../PostsFeed/models/post.models";

export type User = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string; // ISO 8601 date string
  posts: Post[];
};

export type UserRegisterRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  fullName: string;
  email: string;
  bio: string;
};

export type UpdateUserResponse = UpdateUserRequest;

export type UserLoginRequest = {
  username: string;
  password: string;
};
