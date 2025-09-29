import { useFetchMonster } from '@/hooks/useFetchMonster';
import { useMonsterSearch } from '@/hooks/useMonsterSearch';
import {
  CombinationList,
  CombinationParentType,
  CombinationType,
  NewMonsterType,
} from '@/type';
import React, { useEffect, useRef, useState } from 'react';

interface CombinationSearchFieldProps {
  monsters: NewMonsterType[];
  combinations: CombinationType[];
  combination_parent: CombinationParentType[];
  setCombinationResult: (combinationResult: CombinationList[]) => void;
  setParentResult: (parentResult: NewMonsterType[]) => void;
}

const CombinationSearchField = ({
  monsters,
  combinations,
  combination_parent,
  setCombinationResult,
  setParentResult,
}: CombinationSearchFieldProps) => {
  const [searchresult, setSearchResult] = useState<NewMonsterType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [inputText, setInputText] = useState('');
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const filteredMonsters = useMonsterSearch({
    text: inputText,
    monsters: monsters,
  });

  // フォーカス処理
  useEffect(() => {
    const currentItem = itemRefs.current[selectedIndex];
    if (currentItem) {
      currentItem.focus();
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (
      monsters?.some((monster: NewMonsterType) => monster.name === inputText)
    ) {
      setSearchResult([]);
    } else {
      setSearchResult(filteredMonsters);
    }
  }, [inputText, filteredMonsters, monsters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value.replace(/[\s　]+/g, ''));
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, searchresult.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex !== -1) {
        e.preventDefault();
        const selected = searchresult[selectedIndex];
        if (selected) {
          setInputText(selected.name);
          setSelectedIndex(-1);
          setSearchResult([]);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      }
    }
  };

  const { combination_result, parent_result } = useFetchMonster(
    inputText,
    monsters,
    combinations,
    combination_parent
  );

  useEffect(() => {
    // 結果が存在する場合のみ、親コンポーネントのstateを更新
    if (combination_result && parent_result) {
      setCombinationResult(combination_result);
      setParentResult(parent_result);
    }
  }, [
    combination_result,
    parent_result,
    setCombinationResult,
    setParentResult,
  ]);

  return (
    <div className="relative w-2/3">
      <div className="text-center text-3xl p-2">
        モンスター名を入力してください
      </div>
      <div className="flex gap-2">
        <input
          className="outline-none text-5xl px-2 py-5 flex-3 bg-white border-2 border-gray-300 text-center"
          value={inputText}
          ref={inputRef}
          name="monsterName"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={handleKeyDown}
          placeholder="キングスライム"
        />
      </div>
      <ul className="w-full max-h-25 overflow-y-scroll bg-gray-100 z-30 text-2xl">
        {searchresult.map((monster, index) => (
          <li
            onClick={() => setInputText(monster.name)}
            key={monster.monster_id}
            ref={(el: HTMLLIElement | null) => {
              itemRefs.current[index] = el;
            }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="py-0.5 hover:bg-gray-300 cursor-pointer"
          >
            {monster.name}
          </li>
        ))}
      </ul>
      {/* <p className="text-center text-red-400">{errorMsg}</p> */}
    </div>
  );
};

export default CombinationSearchField;
