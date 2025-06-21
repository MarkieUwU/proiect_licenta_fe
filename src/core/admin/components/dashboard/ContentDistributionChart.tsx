import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypedPieChart, TypedPie, TypedCell, TypedResponsiveContainer, TypedTooltip, PieLabelRenderProps } from "@/components/recharts/recharts"

interface DataItem {
  name: string
  value: number
}

export const ContentDistributionChart = () => {
  // This would come from your API, but for now we'll use mock data
  const data: DataItem[] = [
    { name: 'Posts', value: 400 },
    { name: 'Comments', value: 300 },
    { name: 'Likes', value: 300 },
    { name: 'Shares', value: 200 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const renderLabel = ({ name, percent }: PieLabelRenderProps) => 
    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <TypedResponsiveContainer width="100%" height="100%">
            <TypedPieChart>
              <TypedPie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={renderLabel}
              >
                {data.map((entry, index) => (
                  <TypedCell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </TypedPie>
              <TypedTooltip />
            </TypedPieChart>
          </TypedResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 