import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderCircle } from "lucide-react";

interface AmountCardProps {
  title: string;
  amount: number;
  loading: boolean;
}

const AmountCard: React.FC<AmountCardProps> = ({ title, amount, loading = false }) => {

  return (
    <Card className="w-[160px] h-[180px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center'>
          {loading ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <span className='text-6xl'>{amount}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default AmountCard;
