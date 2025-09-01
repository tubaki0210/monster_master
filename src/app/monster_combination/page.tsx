import React from 'react';
import MonsterCombinationPage from '@/components/MonsterCombinationPage';
import { getMonsters } from '@/lib/monster';
import getCombination from '@/lib/combination';
import getCombinationParent from '@/lib/combination_parent';

const Monster_Combination = async () => {
  const monsters = await getMonsters({});
  const combinations = await getCombination({});
  const combinationsParent = await getCombinationParent({});

  return (
    <MonsterCombinationPage
      monsters={monsters}
      combinations={combinations}
      combinationsParent={combinationsParent}
    />
  );
};

export default Monster_Combination;
