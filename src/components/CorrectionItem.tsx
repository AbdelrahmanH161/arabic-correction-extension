import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface CorrectionItemProps {
  text: string;
  correction: string;
  type?: 'grammar' | 'spelling' | 'style';
  onAccept: () => void;
  onIgnore: () => void;
}

export function CorrectionItem({
  text,
  correction,
  type = 'grammar',
  onAccept,
  onIgnore,
}: CorrectionItemProps) {
  // Get badge color based on type
  const getTypeColor = () => {
    switch (type) {
      case 'grammar':
        return 'text-text-error';
      case 'spelling':
        return 'text-yellow-500';
      case 'style':
        return 'text-blue-500';
      default:
        return 'text-text-error';
    }
  };

  // Get badge text based on type
  const getTypeText = () => {
    switch (type) {
      case 'grammar':
        return 'نحوي';
      case 'spelling':
        return 'إملائي';
      case 'style':
        return 'أسلوبي';
      default:
        return 'نحوي';
    }
  };

  return (
    <Card className="mb-3">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-sm ${getTypeColor()} font-medium`}>
          {getTypeText()}
        </span>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button
            variant="primary"
            size="sm"
            onClick={onAccept}
            className="px-4 py-1"
          >
            قبول
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onIgnore}
            className="px-4 py-1"
          >
            تجاهل
          </Button>
        </div>
      </div>

      <p className="text-text-primary text-sm mb-1">{text}</p>
      <p className="text-text-success text-sm">
        التصحيح: <span className="font-medium">{correction}</span>
      </p>
    </Card>
  );
} 