import { Post } from '@/modules/Posts/models/post.models';
import { ConnectionStateEnum } from './connection-state.enum';
import { Theme } from '@/core/models/theme.enum';
import { LanguageCodes } from '@/core/models/language-codes.enum';
import { PrivacyOptions } from '@/core/models/privacy-options.enum';
import { Role } from './role.enum';

export type LoggedUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  theme: Theme;
  language: LanguageCodes;
  role: Role;
};

export type User = {
  id: string;
  profileImage: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string;
  settings: UserSettings;
  posts: Post[];
  following: Connection[];
  follower: Connection[];
  connectionCount: number;
  postsCount: number;
  role: Role;
};

export type UserProfile = {
  id: string;
  profileImage: string;
  username: string;
  fullName: string;
  email: string;
  gender: string;
  bio: string;
  posts: Post[];
  postsCount: number;
  connections: ConnectionUser[];
  connectionsCount: number;
  settings: UserSettings;
};

export type UserDetails = {
  id: string;
  profileImage: string;
  username: string;
  fullName: string;
};

export type ConnectionUser = UserDetails & {
  connectionCount: number;
  postsCount: number;
};

export type UserRegisterRequest = {
  fullName: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: string;
  language: LanguageCodes;
  theme: Theme;
};

export type UpdateUserRequest = {
  profileImage: string;
  fullName: string;
  email: string;
  gender?: string;
  bio?: string;
};

export type UserLoginRequest = {
  username: string;
  password: string;
  language: LanguageCodes;
  theme: Theme;
};

export type ResetPasswordRequest = {
  userId: string;
  password: string;
  confirmPassword: string;
};

export type Connection = {
  following: User;
  followingId: string;
  follower: User;
  followerId: string;
  pending: boolean;
};

export type UserConnection = {
  user: ConnectionUser;
  userId: string;
  pending: boolean;
};

export type ConnectionRequest = {
  user: UserDetails;
  userId: string;
  connectionId: string;
};

export type ConnectionStateResponse = {
  state: ConnectionStateEnum;
  userId: string;
  connectionId: string;
};

export type UserSettings = {
  theme: Theme;
  language: LanguageCodes;
  detailsPrivacy: PrivacyOptions;
  connectionsPrivacy: PrivacyOptions;
  postsPrivacy: PrivacyOptions;
};

export type Suggestion = {
  user: ConnectionUser;
  followerId: string;
  followingId: string;
  state: ConnectionStateEnum;
};
