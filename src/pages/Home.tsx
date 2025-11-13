import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuestCard from "@/components/QuestCard";
import Leaderboard from "@/components/Leaderboard";
import NFTGallery from "@/components/NFTGallery";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  
  // TODO: Remove mock data - replace with real user data from backend
  const [userData] = useState({
    id: '5',
    userName: 'Alex Kovács',
    userPoints: 1250,
    completedQuests: 8,
    currentRank: 42,
  });

  // TODO: Remove mock data - replace with real quests from backend
  const [quests] = useState([
    {
      id: '1',
      title: 'Swap it Up',
      description: 'Do a swap worth $10+ on Base',
      points: 250,
      status: 'completed' as const,
    },
    {
      id: '2',
      title: 'Bridge to Base',
      description: 'Bridge $10+ to Base using Elsa',
      points: 600,
      status: 'completed' as const,
    },
    {
      id: '3',
      title: 'Mini Mover',
      description: 'Transact a total of $50 today',
      points: 300,
      status: 'active' as const,
      resetTime: 'Resets in 6 hours',
    },
    {
      id: '4',
      title: 'Kövess be Twitteren',
      description: 'Kövesd be a CatKitSune hivatalos Twitter fiókját',
      points: 150,
      status: 'available' as const,
    },
    {
      id: '5',
      title: 'Oszd meg a Linkem',
      description: 'Postold újra a CatKitSune linket Twitteren',
      points: 200,
      status: 'available' as const,
    },
  ]);

  // TODO: Remove mock data - replace with real leaderboard from backend
  const [leaderboard] = useState([
    { id: '1', rank: 1, username: 'champion', displayName: 'Kovács Anna', points: 5420, completedQuests: 34 },
    { id: '2', rank: 2, username: 'runner', displayName: 'Nagy Péter', points: 4890, completedQuests: 31 },
    { id: '3', rank: 3, username: 'bronze', displayName: 'Szabó Júlia', points: 4250, completedQuests: 28 },
    { id: '4', rank: 4, username: 'fourth', displayName: 'Tóth Márk', points: 3870, completedQuests: 25 },
    { id: '5', rank: 5, username: 'fifth', displayName: 'Kiss Eszter', points: 3420, completedQuests: 22 },
    { id: '6', rank: 6, username: 'sixth', displayName: 'Varga Dávid', points: 2980, completedQuests: 19 },
    { id: '7', rank: 7, username: 'seventh', displayName: 'Horváth Laura', points: 2650, completedQuests: 17 },
    { id: '8', rank: 8, username: 'eighth', displayName: 'Molnár Bence', points: 2340, completedQuests: 15 },
  ]);

  // TODO: Remove mock functionality - implement real quest start logic
  const handleStartQuest = (questId: string) => {
    console.log('Starting quest:', questId);
    toast({
      title: "Küldetés elkezdve!",
      description: "Sok sikert a teljesítéshez!",
    });
  };

  // TODO: Remove mock functionality - implement real reward claim logic
  const handleClaimReward = (questId: string) => {
    console.log('Claiming reward for quest:', questId);
    toast({
      title: "Jutalom átvéve!",
      description: "Gratulálunk a küldetés teljesítéséhez!",
    });
  };

  // TODO: Remove mock functionality - implement scroll to quests
  const handleViewQuests = () => {
    console.log('Scrolling to quests');
    const questsSection = document.getElementById('quests-section');
    questsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName={userData.userName}
        userPoints={userData.userPoints}
      />
      
      <Hero 
        totalPoints={userData.userPoints}
        completedQuests={userData.completedQuests}
        currentRank={userData.currentRank}
        onViewQuests={handleViewQuests}
      />

      <div className="container px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div id="quests-section">
            <h2 
              className="text-3xl font-bold mb-6" 
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Küldetések
            </h2>
            <div className="space-y-3">
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  {...quest}
                  onStart={handleStartQuest}
                  onClaim={handleClaimReward}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Leaderboard 
              entries={leaderboard}
              currentUserId={userData.id}
            />
            <NFTGallery />
          </div>
        </div>
      </div>
    </div>
  );
}
