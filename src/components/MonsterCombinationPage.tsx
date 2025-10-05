'use client';
import { CombinationList, NewMonsterType } from '@/type';
import React, { useState } from 'react';
import CombinationItem from '@/components/CombinationItem';
import Sideber from '@/components/Sideber';
import CombinationSearchField from './CombinationSearchField';
import ParentResult from './ParentResult';

interface MonsterCombinationPageProps {
  monsters: NewMonsterType[];
}

const MonsterCombinationPage = ({ monsters }: MonsterCombinationPageProps) => {
  const [combinationResult, setCombinationResult] = useState<CombinationList[]>(
    []
  );
  const [parentResult, setParentResult] = useState<NewMonsterType[]>([]);

  return (
    <div className="container flex flex-col items-center m-auto font-serif py-6">
      <Sideber />
      <CombinationSearchField
        monsters={monsters}
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
