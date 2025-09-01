import KindTable from '@/components/KindTable';
import MonsterDetail from '@/components/MonsterDetail';
import RankTable from '@/components/RankTable';
import SearchBar from '@/components/SearchBar';
import Sideber from '@/components/Sideber';
import { getMonsters } from '@/lib/monster';
import { NewMonsterType } from '@/type';
import Link from 'next/link';
import React from 'react';
export async function generateStaticParams() {
  const monsterKinds = [
    'slime',
    'doragon',
    'akuma',
    'busitu',
    'zombi',
    'maju',
    'sizen',
    'maou',
  ]; // 全ての系統名を取得する関数を実装する必要があります
  return monsterKinds.map((kind) => ({ kind }));
}

type KindPageProps = {
  params: Promise<{ kind: string }>;
};

const KindPage = async ({ params }: KindPageProps) => {
  const { kind } = await params;
  // const match = { "slime" : "スライム系", "doragon" : "ドラゴン系", "akuma" : "悪魔系", "busitu" : "物質系", "zombi" : "ゾンビ系", "maju" : "魔獣系", "sizen"  : "自然系", "maou" : "魔王系"}
  const displayedMonsters = await getMonsters({ kind: kind });
  // console.log(response)
  // console.log(match[kind])
  return (
    <div className="container m-auto flex flex-col justify-center items-center mt-10 mb-10 ">
      <Sideber />
      <SearchBar />
      <KindTable />
      <RankTable />
      <div className="w-1/2 mt-5">
        <div className="text-3xl text-center">
          <div>
            {displayedMonsters[0].status}のモンスター({displayedMonsters.length}
            )
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
export default KindPage;
