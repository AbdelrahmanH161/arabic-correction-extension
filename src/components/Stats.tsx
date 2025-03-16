import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface StatsProps {
  wordCount: number;
  errorCount: number;
}

export function Stats({ wordCount, errorCount }: StatsProps) {
  return (
    <Card className="bg-background-dark mb-4">
      <div className="flex justify-between">
        <div className="text-right">
          <span className="text-text-secondary text-sm block">عدد الكلمات</span>
          <span className="text-text-primary text-xl font-bold">{wordCount}</span>
        </div>
        <div className="text-right">
          <span className="text-text-secondary text-sm block">الأخطاء</span>
          <span className="flex items-center">
            <span className="text-text-primary text-xl font-bold">{errorCount}</span>
            {errorCount > 0 && (
              <Badge variant="error" className="mr-2">
                {errorCount}
              </Badge>
            )}
          </span>
        </div>
      </div>
    </Card>
  );
} 