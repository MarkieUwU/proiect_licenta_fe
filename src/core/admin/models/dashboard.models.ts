export interface UserStats {
  id: number;
  username: string;
  fullName: string;
  profileImage: string;
  email: string;
  createdAt: string;
}

export interface PostStats {
  id: number;
  content: string;
  createdAt: string;
  user: {
    username: string;
    fullName: string;
    profileImage: string;
  };
}

export interface DashboardStatsData {
  totalUsers: number;
  totalPosts: number;
  totalConnections: number;
  recentUsers: UserStats[];
  recentPosts: PostStats[];
}
