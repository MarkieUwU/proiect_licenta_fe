import { Post } from '@/modules/Posts/models/post.models';
import { ConnectionStateEnum } from './connection-state.enum';

export type LoggedUser = {
  id: number;
  fullName: string;
  username: string;
  email: string;
};

export type User = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string; // ISO 8601 date string
  posts: Post[];
  following: Connection[];
  follower: Connection[];
};

export type UserProfile = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  bio: string;
  posts: Post[];
  connections: ConnectionUser[];
};

export type ConnectionUser = {
  id: number;
  username: string;
  fullName: string;
};

export type UserRegisterRequest = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UpdateUserRequest = {
  fullName: string;
  email: string;
  bio?: string;
};

export type UserLoginRequest = {
  username: string;
  password: string;
};

export type Connection = {
  following: User;
  followingId: number;
  follower: User;
  followerId: number;
  isPending: boolean;
};

export type UserConnection = {
  user: User;
  userId: number;
  pending: boolean;
  connection: Connection;
};

export type ConnectionStateResponse = {
  connection: Connection;
  connectionState: ConnectionStateEnum;
};
