import { SearchMonster } from '@/app/actions/actions';
import { useMonsterSearch } from '@/hooks/useMonsterSearch';
import { CombinationList, NewMonsterType } from '@/type';
import React, { useEffect, useRef, useState } from 'react';

interface CombinationSearchFieldProps {
  monsters: NewMonsterType[];
  setCombinationResult: (combinationResult: CombinationList[]) => void;
  setParentResult: (parentResult: NewMonsterType[]) => void;
}

const CombinationSearchField = ({
  monsters,
  setCombinationResult,
  setParentResult,
}: CombinationSearchFieldProps) => {
  const [searchresult, setSearchResult] = useState<NewMonsterType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [inputText, setInputText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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

  const handleSubmit = async (formData: FormData) => {
    const monsterName = formData.get('monsterName') as string;
    const { error, combination_result, parent_result } = await SearchMonster(
      monsterName
    );
    if (!error) {
      setCombinationResult(combination_result!);
      setParentResult(parent_result!);
      setErrorMsg('');
    } else {
      setErrorMsg(error);
    }
  };

  return (
    <div className="relative w-2/3">
      <div className="text-center text-3xl p-2">
        モンスター名を入力してください
      </div>
      <form action={handleSubmit} className="flex gap-2">
        <input
          className="outline-none text-5xl px-2 py-5 flex-3 bg-white border-2 border-gray-300 text-center"
          value={inputText}
          ref={inputRef}
          name="monsterName"
          onChange={(e) => {
            setInputText(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="キングスライム"
        />
        <button type="submit" className="bg-blue-300 flex-1">
          検索
        </button>
      </form>
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
      <p className="text-center text-red-400">{errorMsg}</p>
    </div>
  );
};

export default CombinationSearchField;
