import KindTable from '@/components/KindTable';
import MonsterDetail from '@/components/MonsterDetail';
import RankTable from '@/components/RankTable';
import SearchBar from '@/components/SearchBar';
import Sideber from '@/components/Sideber';
import { getMonsters } from '@/lib/monster';
import { NewMonsterType } from '@/type';
import React from 'react';
export async function generateStaticParams() {
  const monsterKinds = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'S', 'X']; // 全ての系統名を取得する関数を実装する必要があります
  return monsterKinds.map((rank: string) => ({ rank }));
}

interface RankPageProps {
  params: Promise<{ rank: string }>;
}

const RankPage = async ({ params }: RankPageProps) => {
  // 分割代入
  const { rank } = await params;
  const displayedMonsters = await getMonsters({ rank: rank });
  return (
    <div className="container m-auto flex flex-col justify-center items-center mt-10 mb-10 ">
      <Sideber />
      <SearchBar />
      <KindTable />
      <RankTable />
      <div className="w-1/2 mt-5">
        <div className="text-3xl text-center">
          <div>
            {rank}のモンスター({displayedMonsters.length})
          </div>
        </div>
        <div>
          {displayedMonsters.map((monster: NewMonsterType) => (
            <MonsterDetail key={monster.monster_id} monster={monster} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankPage;
