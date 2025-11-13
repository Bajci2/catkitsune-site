import { Trophy, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroProps {
  totalPoints?: number;
  completedQuests?: number;
  currentRank?: number;
  onViewQuests?: () => void;
}

export default function Hero({ 
  totalPoints = 0, 
  completedQuests = 0, 
  currentRank = 0,
  onViewQuests 
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background py-16">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
      
      <div className="container relative px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 
            className="text-5xl font-bold tracking-tight mb-4" 
            style={{ fontFamily: 'Poppins, sans-serif' }}
            data-testid="text-hero-title"
          >
            Teljesíts Küldetéseket. Gyűjts Pontokat. Mássz a Ranglétán.
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Csatlakozz a közösséghez és érj el új magasságokat minden egyes küldetéssel
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <Card className="p-6">
              <div className="flex flex-col items-center gap-2">
                <Trophy className="h-8 w-8 text-primary mb-1" />
                <div className="text-3xl font-bold" data-testid="text-total-points">
                  {totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Összpontszám</div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center gap-2">
                <Target className="h-8 w-8 text-primary mb-1" />
                <div className="text-3xl font-bold" data-testid="text-completed-quests">
                  {completedQuests}
                </div>
                <div className="text-sm text-muted-foreground">Teljesített</div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="h-8 w-8 text-primary mb-1" />
                <div className="text-3xl font-bold" data-testid="text-current-rank">
                  #{currentRank || '-'}
                </div>
                <div className="text-sm text-muted-foreground">Helyezés</div>
              </div>
            </Card>
          </div>

          <Button 
            size="lg" 
            onClick={onViewQuests}
            data-testid="button-view-quests"
            className="font-semibold"
          >
            Aktív Küldetések Megtekintése
          </Button>
        </div>
      </div>
    </div>
  );
}
