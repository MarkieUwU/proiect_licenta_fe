import { Post } from '@/modules/Posts/models/post.models';
import { ConnectionStateEnum } from './connection-state.enum';
import { Theme } from '@/core/models/theme.enum';
import { LanguageCodes } from '@/core/models/language-codes.enum';
import { PrivacyOptions } from '@/core/models/privacy-options.enum';
import { Role } from './role.enum';

export type LoggedUser = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  theme: Theme;
  language: LanguageCodes;
  role: Role;
};

export type User = {
  id: number;
  profileImage: string;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string; // ISO 8601 date string
  settings: Settings;
  posts: Post[];
  following: Connection[];
  follower: Connection[];
  connectionCount: number;
  postsCount: number;
  role: Role;
};

export type UserProfile = {
  id: number;
  profileImage: string;
  username: string;
  fullName: string;
  email: string;
  gender: string;
  bio: string;
  posts: Post[];
  connections: ConnectionUser[];
  settings: Settings;
};

export type ConnectionUser = {
  id: number;
  profileImage: string;
  username: string;
  fullName: string;
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
  userId: number;
  password: string;
  confirmPassword: string;
};

export type Connection = {
  following: User;
  followingId: number;
  follower: User;
  followerId: number;
  pending: boolean;
};

export type UserConnection = {
  user: User; 
  userId: number;
  pending: boolean;
  connection: Connection;
};

export type ConnectionRequest = {
  user: User,
  userId: number;
  connectionId: number;
}

export type ConnectionStateResponse = {
  connection: Connection;
  connectionState: ConnectionStateEnum;
};

export type Settings = {
  id: number;
  theme: Theme;
  language: LanguageCodes;
  detailsPrivacy: PrivacyOptions;
  connectionsPrivacy: PrivacyOptions;
  postsPrivacy: PrivacyOptions;
  userId: number;
  user?: User;
};

export type SettingsRequest = {
  theme: Theme;
  language: LanguageCodes;
  detailsPrivacy: PrivacyOptions;
  connectionsPrivacy: PrivacyOptions;
  postsPrivacy: PrivacyOptions;
};

export type Suggestion = {
  user: User;
  connection?: Connection;
  connectionState: ConnectionStateEnum;
};
