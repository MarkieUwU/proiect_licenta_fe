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
  totalComments: number;
  totalLikes: number;
  totalConnections: number;
  totalReports: number;
  recentUsers: UserStats[];
  recentPosts: PostStats[];
  userGrowth: UserGrowth[];
  avgPopularityGrowthRate: number;
}

export interface UserGrowth {
  name: string;
  users: number;
}

export interface PieChartDataItem {
  name: string;
  value: number;
}

export interface DistributionChartData {
  posts: number;
  comments: number;
  likes: number;
  reports: number;
}


