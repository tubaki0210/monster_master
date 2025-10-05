import React from 'react';
import MonsterCombinationPage from '@/components/MonsterCombinationPage';
import { getMonsters } from '@/lib/monster';

const Monster_Combination = async () => {
  const monsters = await getMonsters({});
  return <MonsterCombinationPage monsters={monsters} />;
};

export default Monster_Combination;
