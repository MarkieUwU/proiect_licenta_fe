import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "chart.js";
import { LoaderCircle } from "lucide-react";
import { Pie } from "react-chartjs-2";

interface PieChartSectionProps {
  title: string;
  data: ChartData<'pie'>;
  loading: boolean;
}

const PieChartSection: React.FC<PieChartSectionProps> = ({ title, data, loading = false }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Card className='lg:w-[900px] w-full mx-auto p-3'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardContent className="flex justify-center h-[500px]">
          {loading ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <Pie options={options} data={data} />
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default PieChartSection;
