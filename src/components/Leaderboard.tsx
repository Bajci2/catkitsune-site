import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  displayName: string;
  avatarUrl?: string;
  points: number;
  completedQuests: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export default function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />;
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />;
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Trophy className="h-5 w-5 text-primary" />
          Ranglétra
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-3 p-6 pb-4">
          {top3.map((entry) => {
            const isCurrentUser = entry.id === currentUserId;
            
            return (
              <Card 
                key={entry.id}
                className={`p-4 ${isCurrentUser ? 'border-primary border-2' : ''}`}
                data-testid={`card-leader-${entry.rank}`}
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  <Badge variant="secondary" className="gap-1.5 px-4 py-2">
                    <Trophy className="h-4 w-4" />
                    <span className="font-bold text-lg" data-testid={`text-points-${entry.rank}`}>
                      {entry.points.toLocaleString()}
                    </span>
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>

        {rest.length > 0 && (
          <ScrollArea className="h-64 px-6 pb-6">
            <div className="space-y-2">
              {rest.map((entry) => {
                const isCurrentUser = entry.id === currentUserId;
                
                return (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between gap-3 p-3 rounded-md hover-elevate ${
                      isCurrentUser ? 'border border-primary' : ''
                    }`}
                    data-testid={`row-leader-${entry.rank}`}
                  >
                    <div className="w-8 text-center font-bold text-muted-foreground">
                      #{entry.rank}
                    </div>
                    
                    <div className="font-semibold text-sm">
                      {entry.points.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
