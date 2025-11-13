import Leaderboard from '../Leaderboard';

export default function LeaderboardExample() {
  const mockEntries = [
    { id: '1', rank: 1, username: 'champion', displayName: 'Kovács Anna', points: 5420, completedQuests: 34 },
    { id: '2', rank: 2, username: 'runner', displayName: 'Nagy Péter', points: 4890, completedQuests: 31 },
    { id: '3', rank: 3, username: 'bronze', displayName: 'Szabó Júlia', points: 4250, completedQuests: 28 },
    { id: '4', rank: 4, username: 'fourth', displayName: 'Tóth Márk', points: 3870, completedQuests: 25 },
    { id: '5', rank: 5, username: 'fifth', displayName: 'Kiss Eszter', points: 3420, completedQuests: 22 },
    { id: '6', rank: 6, username: 'sixth', displayName: 'Varga Dávid', points: 2980, completedQuests: 19 },
    { id: '7', rank: 7, username: 'seventh', displayName: 'Horváth Laura', points: 2650, completedQuests: 17 },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Leaderboard entries={mockEntries} currentUserId="5" />
    </div>
  );
}
