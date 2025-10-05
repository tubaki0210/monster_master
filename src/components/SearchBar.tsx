'use client';
import { useMonsterSearch } from '@/hooks/useMonsterSearch';
import { NewMonsterType } from '@/type';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SearchBarProps {
  monsters: NewMonsterType[];
}

const SearchBar = ({ monsters }: SearchBarProps) => {
  const router = useRouter();
  // const { monsters, monsterError } = useGetAllMonster();
  const [text, setText] = useState<string>('');
  const [alertmsg, setAlertMsg] = useState<string>('');
  const [isvisible, setIsvisible] = useState<boolean>(true);

  const searchResults = useMonsterSearch({ text: text, monsters: monsters });

  const SearchMonster = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const search: NewMonsterType[] = searchResults.filter(
      (monster: NewMonsterType) => monster.name === text
    );
    if (search.length !== 0) {
      setAlertMsg('');
      router.push(`/monster/${search?.[0].monster_id}`);
    } else if (text === '') setAlertMsg('モンスター名を入力してください');
    else setAlertMsg('正しいモンスター名を入力してください');
  };

  const handleSetText = (name: string) => {
    setText(name);
    setIsvisible(false);
  };

  return (
    <div className="w-1/2 mb-20">
      <p className="text-red-500 text-center py-1">{alertmsg}</p>
      <div className="flex justify-between ">
        <input
          className="w-4/5 border-2 p-2"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setIsvisible(true);
          }}
          placeholder="検索したいモンスター名を入力してください"
        />
        <button
          className="px-8 py-2 bg-blue-200 text-white"
          onClick={(e) => SearchMonster(e)}
        >
          探す
        </button>
      </div>
      {isvisible && (
        <ul className="w-full max-h-25 overflow-y-scroll bg-gray-100 z-30 text-2xl">
          {searchResults?.map((monster) => (
            <li
              onClick={() => handleSetText(monster.name)}
              key={monster.monster_id}
              className="py-0.5 hover:bg-gray-300 cursor-pointer"
            >
              {monster.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
