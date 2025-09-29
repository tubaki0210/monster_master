'use client';
import {
  CombinationList,
  CombinationParentType,
  CombinationType,
  NewMonsterType,
} from '@/type';
import React, { useState } from 'react';
import CombinationItem from '@/components/CombinationItem';
import Sideber from '@/components/Sideber';
import CombinationSearchField from './CombinationSearchField';
import ParentResult from './ParentResult';

interface MonsterCombinationPageProps {
  monsters: NewMonsterType[];
  // combinations: CombinationType[];
  // combination_parent: CombinationParentType[];
}

const MonsterCombinationPage = ({
  monsters,
}: // combinations,
// combination_parent,
MonsterCombinationPageProps) => {
  const [combinationResult, setCombinationResult] = useState<CombinationList[]>(
    []
  );
  const [parentResult, setParentResult] = useState<NewMonsterType[]>([]);

  return (
    <div className="container flex flex-col items-center m-auto font-serif py-6">
      <Sideber />
      <CombinationSearchField
        monsters={monsters}
        // combinations={combinations}
        // combination_parent={combination_parent}
        setCombinationResult={setCombinationResult}
        setParentResult={setParentResult}
      />
      <div className="w-2/3">
        <CombinationItem combinationResult={combinationResult} />
      </div>
      <div className="mt-10">
        <ParentResult parentResult={parentResult} />
      </div>
    </div>
  );
};
export default MonsterCombinationPage;
