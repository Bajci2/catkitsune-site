import QuestCard from '../QuestCard';

export default function QuestCardExample() {
  return (
    <div className="grid gap-6 p-6 max-w-4xl mx-auto md:grid-cols-2 lg:grid-cols-3">
      <QuestCard
        id="1"
        title="Első Bejelentkezés"
        description="Jelentkezz be először az alkalmazásba és fedezd fel a funkciókat"
        category="Kezdő"
        difficulty="easy"
        points={100}
        iconName="star"
        status="completed"
      />
      <QuestCard
        id="2"
        title="Kódolási Mester"
        description="Írj 500 sor hibamentes kódot egyetlen nap alatt"
        category="Programozás"
        difficulty="hard"
        points={500}
        iconName="code"
        status="active"
        progress={65}
      />
      <QuestCard
        id="3"
        title="Sorozat Építő"
        description="Jelentkezz be 7 egymást követő napon keresztül"
        category="Elkötelezettség"
        difficulty="medium"
        points={250}
        iconName="flame"
        status="available"
      />
    </div>
  );
}
