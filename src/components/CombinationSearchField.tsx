import { useMonsterSearch } from '@/hooks/useMonsterSearch';
import { NewMonsterType } from '@/type';
import React, { useEffect, useRef, useState } from 'react';

interface CombinationSearchFieldProps {
  inputText: string;
  setInputText: (inputText: string) => void;
  monsters: NewMonsterType[];
}

const CombinationSearchField = ({
  inputText,
  setInputText,
  monsters,
}: CombinationSearchFieldProps) => {
  const [searchresult, setSearchResult] = useState<NewMonsterType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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
      e.preventDefault();
      const selected = searchresult[selectedIndex];
      if (selected) {
        setInputText(selected.name);
        setSearchResult([]);
      }
    }
  };
  return (
    <div className="relative w-2/3">
      <div className="text-center text-3xl p-2">
        モンスター名を入力してください
      </div>
      <input
        className="outline-none text-5xl px-2 py-5 w-full bg-white border-2 border-gray-300 text-center"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setSelectedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        placeholder="キングスライム"
      />
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
    </div>
  );
};

export default CombinationSearchField;
