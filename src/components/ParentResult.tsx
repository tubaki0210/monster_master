import { NewMonsterType } from '@/type';
import Link from 'next/link';
import React from 'react';

interface ParentResultProps {
  parentResult: NewMonsterType[];
}

const ParentResult = ({ parentResult }: ParentResultProps) => {
  return (
    <div>
      <div className="text-center text-3xl font-bold py-3">
        このモンスターを配合に使うモンスター
      </div>
      <div className="flex flex-col items-center">
        {parentResult.map((array: NewMonsterType) => (
          <Link
            href={`/monster/${array.monster_id}`}
            className="text-center py-1 underline text-blue-400 hover:text-blue-500"
            key={array.monster_id}
          >
            <span className="text-2xl">{array.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ParentResult;
