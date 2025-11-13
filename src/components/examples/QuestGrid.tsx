import QuestGrid from '../QuestGrid';

export default function QuestGridExample() {
  const mockQuests = [
    {
      id: '1',
      title: 'Első Bejelentkezés',
      description: 'Jelentkezz be először az alkalmazásba',
      category: 'Kezdő',
      difficulty: 'easy' as const,
      points: 100,
      iconName: 'star',
      status: 'completed' as const,
    },
    {
      id: '2',
      title: 'Kódolási Mester',
      description: 'Írj 500 sor hibamentes kódot',
      category: 'Programozás',
      difficulty: 'hard' as const,
      points: 500,
      iconName: 'code',
      status: 'active' as const,
      progress: 65,
    },
    {
      id: '3',
      title: 'Sorozat Építő',
      description: 'Jelentkezz be 7 egymást követő napon',
      category: 'Elkötelezettség',
      difficulty: 'medium' as const,
      points: 250,
      iconName: 'flame',
      status: 'available' as const,
    },
    {
      id: '4',
      title: 'Közösségi Hős',
      description: 'Segíts 5 másik felhasználónak',
      category: 'Közösség',
      difficulty: 'medium' as const,
      points: 300,
      iconName: 'heart',
      status: 'available' as const,
    },
    {
      id: '5',
      title: 'Rapid Növekedés',
      description: 'Szerezz 1000 pontot egy héten belül',
      category: 'Kihívás',
      difficulty: 'hard' as const,
      points: 750,
      iconName: 'trending',
      status: 'active' as const,
      progress: 42,
    },
  ];

  return (
    <div className="p-6">
      <QuestGrid quests={mockQuests} />
    </div>
  );
}
