import { NewMonsterType } from '@/type';
import Link from 'next/link';
import React from 'react';

interface MonsterTableProps {
  monster: NewMonsterType | null;
}

const MonsterTable = ({ monster }: MonsterTableProps) => {
  return (
    <table className="border-collapse w-full">
      <tbody>
        <tr>
          <td className="border py-4 text-2xl text-center w-1/3 font-bold">
            モンスター名
          </td>
          <td className="border py-4 text-2xl text-center">{monster?.name}</td>
        </tr>
        <tr>
          <td className="border py-4 text-2xl text-center w-1/3 font-bold">
            ランク
          </td>
          <td className="border py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/${monster?.ranks}`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              {monster?.ranks}
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border py-4 text-2xl text-center w-1/3 font-bold">
            系統
          </td>
          <td className="border py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/${monster?.status_romaji}`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              {monster?.status}
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border py-4 text-2xl text-center w-1/3 font-bold">
            スカウト可能エリア
          </td>
          <td className="border py-4 text-base text-center">
            {monster?.scout}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MonsterTable;
