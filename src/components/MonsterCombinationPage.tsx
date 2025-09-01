'use client';
import { CombinationParentType, CombinationType, NewMonsterType } from '@/type';
import React, { useState } from 'react';
import CombinationItem from '@/components/CombinationItem';
import Sideber from '@/components/Sideber';
import { useFetchMonster } from '@/hooks/useFetchMonster';
import CombinationSearchField from './CombinationSearchField';
import ParentResult from './ParentResult';

interface MonsterCombinationPageProps {
  monsters: NewMonsterType[];
  combinations: CombinationType[];
  combinationsParent: CombinationParentType[];
}

const MonsterCombinationPage = ({
  monsters,
  combinations,
  combinationsParent,
}: MonsterCombinationPageProps) => {
  const [text, setText] = useState<string>('');
  const { combination_result, parent_result } = useFetchMonster({
    name: text, // ユーザーが入力したテキスト（確定名）を渡す
    monsters: monsters,
    combinations: combinations,
    combinations_parent: combinationsParent,
  });

  return (
    <div className="container flex flex-col items-center m-auto font-serif py-6">
      <Sideber />
      <CombinationSearchField
        inputText={text}
        setInputText={setText}
        monsters={monsters}
      />
      <div className="w-2/3">
        <CombinationItem combinationResult={combination_result} />
      </div>
      <div className="mt-10">
        <ParentResult parentResult={parent_result} />
      </div>
    </div>
  );
};
export default MonsterCombinationPage;
