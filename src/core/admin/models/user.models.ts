import { Role } from "@/modules/Profile/models/role.enum";

export interface AdminUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
  _count: {
    posts: number;
    follower: number;
    following: number;
  };
}

export interface UsersResponse {
  users: AdminUser[];
  total: number;
  pages: number;
}
