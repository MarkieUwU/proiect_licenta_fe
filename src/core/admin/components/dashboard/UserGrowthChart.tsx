import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer } from 'recharts'
import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "@/core/admin/apis/admin.api"
import { TypedCartesianGrid, TypedLine, TypedLineChart, TypedTooltip, TypedXAxis, TypedYAxis } from "@/components/recharts/recharts"

export const UserGrowthChart = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: getDashboardStats
  })

  // This would come from your API, but for now we'll use mock data
  const data = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 600 },
    { name: 'Mar', users: 800 },
    { name: 'Apr', users: 1000 },
    { name: 'May', users: 1200 },
    { name: 'Jun', users: 1400 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <TypedLineChart data={data}>
              <TypedCartesianGrid strokeDasharray="3 3" />
              <TypedXAxis dataKey="name" />
              <TypedYAxis />
              <TypedTooltip />
              <TypedLine 
                type="monotone" 
                dataKey="users" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </TypedLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 