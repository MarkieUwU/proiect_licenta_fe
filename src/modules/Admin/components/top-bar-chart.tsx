import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "chart.js";
import { LoaderCircle } from "lucide-react";
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface TopBarChartProps {
  title: string;
  data: ChartData<"bar">;
  loading: boolean;
}

const TopBarChart: React.FC<TopBarChartProps> = ({ title, data, loading = false }) => {
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false
    },
    scale: {
      y: {
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <Card className='lg:w-[900px] w-full mx-auto p-3'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex justify-center h-[400px] '>
        {loading ? (
          <LoaderCircle className='animate-spin' />
        ) : (
          <Bar options={options} data={data} key={title} />
        )}
      </CardContent>
    </Card>
  );
}

export default TopBarChart;
