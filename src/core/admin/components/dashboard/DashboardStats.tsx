import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Link2, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalPosts: number;
    totalConnections: number;
    avgPopularityGrowthRate: number;
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const { t } = useTranslation();

  const getGrowthRate = () => {
    const rate = stats.avgPopularityGrowthRate;
    const growthRate = rate > 0 ? '+' + rate.toFixed() : rate.toFixed();
    return growthRate + '%';
  }

  const statCards = [
    {
      title: "TotalUsers",
      value: stats.totalUsers,
      icon: Users,
      description: "TotalUsersDescription"
    },
    {
      title: "TotalPosts",
      value: stats.totalPosts,
      icon: FileText,
      description: "TotalPostsDescription"
    },
    {
      title: "TotalConnections",
      value: stats.totalConnections,
      icon: Link2,
      description: "TotalConnectionsDescription"
    },
    {
      title: "GrowthRate",
      value: getGrowthRate(),
      icon: TrendingUp,
      description: "GrowthRateDescription"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t(`Pages.Admin.AdminDashboard.Stats.${stat.title}`)}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {t(`Pages.Admin.AdminDashboard.Stats.${stat.description}`)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}