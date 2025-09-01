import { NewMonsterType } from '@/type';
import Link from 'next/link';
import React from 'react';

interface MonsterDetailProps {
  monster: NewMonsterType;
}

const MonsterDetail = ({ monster }: MonsterDetailProps) => {
  return (
    <div className="flex items-center border-2 p-5 mt-5 justify-between">
      <div className="flex flex-col items-center w-1/5">
        <Link
          href={`/monster/${monster.monster_id}`}
          className="underline text-blue-400 hover:text-blue-500"
        >
          <span key={monster.monster_id}>{monster.name}</span>
        </Link>
        <div className="flex">
          <span>({monster.ranks})</span>
          <span className="ml-2">{monster.status}</span>
        </div>
      </div>
      <div className="text-sm w-3/5 p-1 text-center">{monster.scout}</div>
    </div>
  );
};

export default MonsterDetail;
