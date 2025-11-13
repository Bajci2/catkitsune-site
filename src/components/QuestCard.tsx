import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuestCardProps {
  id: string;
  title: string;
  description: string;
  points: number;
  status?: "available" | "active" | "completed";
  resetTime?: string;
  onStart?: (id: string) => void;
  onClaim?: (id: string) => void;
}

export default function QuestCard({
  id,
  title,
  description,
  points,
  status = "available",
  resetTime,
  onStart,
  onClaim,
}: QuestCardProps) {
  const getStatusIcon = () => {
    if (status === "completed") {
      return <CheckCircle2 className="h-12 w-12 text-green-500" />;
    }
    return <Circle className="h-12 w-12 text-muted-foreground" />;
  };

  const handleClick = () => {
    if (status === "available") {
      onStart?.(id);
    } else if (status === "completed") {
      onClaim?.(id);
    }
  };

  return (
    <Card 
      className="p-4 hover-elevate cursor-pointer transition-all duration-200"
      data-testid={`card-quest-${id}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-tight mb-1" data-testid={`text-quest-title-${id}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          {resetTime && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{resetTime}</span>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 text-right">
          <div className="text-green-600 dark:text-green-400 font-bold text-lg" data-testid={`text-points-${id}`}>
            +{points} EP
          </div>
          {status === "active" && (
            <div className="text-xs text-muted-foreground mt-1">
              $50 / $50
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
