import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer } from 'recharts'
import { TypedCartesianGrid, TypedLine, TypedLineChart, TypedTooltip, TypedXAxis, TypedYAxis } from "@/components/recharts/recharts"
import { UserGrowth } from "../../models/dashboard.models"

interface UserGrowthChartProps {
  userGrowth: UserGrowth[]
  title: string
}

export const UserGrowthChart = ({ userGrowth, title }: UserGrowthChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <TypedLineChart data={userGrowth}>
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