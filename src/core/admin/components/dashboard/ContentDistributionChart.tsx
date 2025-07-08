import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypedPieChart, TypedPie, TypedCell, TypedResponsiveContainer, TypedTooltip, PieLabelRenderProps } from "@/components/recharts/recharts"
import { DistributionChartData, PieChartDataItem } from "../../models/dashboard.models"
import { useTranslation } from "react-i18next"

interface ContentDistributionChartProps {
  chartData: DistributionChartData
  title: string
}

export const ContentDistributionChart = ({
  chartData,
  title
}: ContentDistributionChartProps) => {
  const { t } = useTranslation();
  const data: PieChartDataItem[] = [
    { name: t('Pages.Admin.AdminDashboard.ContentDistribution.Posts'), value: chartData.posts },
    { name: t('Pages.Admin.AdminDashboard.ContentDistribution.Comments'), value: chartData.comments },
    { name: t('Pages.Admin.AdminDashboard.ContentDistribution.Likes'), value: chartData.likes },
    { name: t('Pages.Admin.AdminDashboard.ContentDistribution.Reports'), value: chartData.reports },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderLabel = ({ name, percent }: PieLabelRenderProps) =>
    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[300px]'>
          <TypedResponsiveContainer width='100%' height='100%'>
            <TypedPieChart>
              <TypedPie
                data={data}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
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
  );
};