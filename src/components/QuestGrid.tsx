import QuestCard from "./QuestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  iconName: string;
  status?: "available" | "active" | "completed";
  progress?: number;
}

interface QuestGridProps {
  quests: Quest[];
  onStartQuest?: (id: string) => void;
  onClaimReward?: (id: string) => void;
}

export default function QuestGrid({ quests, onStartQuest, onClaimReward }: QuestGridProps) {
  const activeQuests = quests.filter(q => q.status === "active");
  const availableQuests = quests.filter(q => q.status === "available");
  const completedQuests = quests.filter(q => q.status === "completed");

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4 mb-6" data-testid="tabs-quest-filter">
        <TabsTrigger value="all" data-testid="tab-all">
          Összes ({quests.length})
        </TabsTrigger>
        <TabsTrigger value="active" data-testid="tab-active">
          Aktív ({activeQuests.length})
        </TabsTrigger>
        <TabsTrigger value="available" data-testid="tab-available">
          Elérhető ({availableQuests.length})
        </TabsTrigger>
        <TabsTrigger value="completed" data-testid="tab-completed">
          Kész ({completedQuests.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quests.map((quest) => (
            <QuestCard
              key={quest.id}
              {...quest}
              onStart={onStartQuest}
              onClaim={onClaimReward}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="active" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              {...quest}
              onStart={onStartQuest}
              onClaim={onClaimReward}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="available" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              {...quest}
              onStart={onStartQuest}
              onClaim={onClaimReward}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="completed" className="mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {completedQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              {...quest}
              onStart={onStartQuest}
              onClaim={onClaimReward}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
