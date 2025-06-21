import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "@/core/admin/apis/admin.api"
import { DashboardStats } from "@/core/admin/components/dashboard/DashboardStats"
import { RecentActivity } from "@/core/admin/components/dashboard/RecentActivity"
import { UserGrowthChart } from "@/core/admin/components/dashboard/UserGrowthChart"
import { ContentDistributionChart } from "@/core/admin/components/dashboard/ContentDistributionChart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardStatsData } from "../models/dashboard.models"

export const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery<DashboardStatsData>({
    queryKey: ['admin-stats'],
    queryFn: getDashboardStats
  })

  if (isLoading || !stats) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          {/* Add date range picker here if needed */}
        </div>
      </div>

      <DashboardStats stats={stats} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <UserGrowthChart />
        <ContentDistributionChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentActivity 
          recentUsers={stats.recentUsers} 
          title="Recent Users" 
        />
        <RecentActivity 
          recentPosts={stats.recentPosts} 
          title="Recent Posts" 
        />
      </div>
    </div>
  )
}

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-[200px]" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px]" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(2)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-[150px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
) 