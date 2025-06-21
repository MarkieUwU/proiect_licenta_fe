export interface DashboardStatsData {
  totalUsers: number;
  totalPosts: number;
  totalConnections: number;
  recentUsers: Array<{
    id: number;
    username: string;
    fullName: string;
    email: string;
    createdAt: string;
  }>;
  recentPosts: Array<{
    id: number;
    content: string;
    createdAt: string;
    user: {
      username: string;
      fullName: string;
    };
  }>;
}
