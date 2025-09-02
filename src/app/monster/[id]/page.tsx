import CombinationItem from '@/components/CombinationItem';
import Sideber from '@/components/Sideber';
import React from 'react';
import { getMonsters } from '@/lib/monster';
import ParentResult from '@/components/ParentResult';
import MonsterTable from '@/components/MonsterTable';
import { getMonseterCombParent } from '@/lib/MonsterCombParent';

const getMonster = async (monster_id: string) => {
  // ターゲットモンスター
  const monster = await getMonsters({ monster_id: monster_id });
  const target_monster = monster[0];
  const { combination_result, parent_result } = await getMonseterCombParent(
    target_monster
  );
  return {
    monster: target_monster,
    combination: combination_result,
    parent: parent_result,
  };
};

export const generateStaticParams = async () => {
  const monsters = await getMonsters({}); // 全モンスターのデータを取得
  // Next.jsが要求する形式 [{ monsterName: 'slime' }, { monsterName: 'dragon' }, ...] で返す
  return monsters.map((monster) => ({
    id: String(monster.monster_id), // URLに使う名前 (例: 'king-slime')
  }));
};

interface MonsterPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MonsterDetailPage = async ({ params }: MonsterPageProps) => {
  // params.id でURLの動的な部分 (例: 'slime') を受け取れる
  const { id } = await params;
  const { monster, combination, parent } = await getMonster(id);
  return (
    <div className="container m-auto flex justify-center py-8">
      <Sideber />
      <div className="w-2/3">
        <div>
          <div className="text-center text-3xl py-3 font-bold">
            モンスター情報
          </div>
          <MonsterTable monster={monster} />
        </div>
        <div className="mt-10">
          <div className="text-center text-3xl font-bold py-3">配合情報</div>
          <CombinationItem combinationResult={combination} />
        </div>
        <div className="mt-10">
          <ParentResult parentResult={parent} />
        </div>
      </div>
    </div>
  );
};
export default MonsterDetailPage;
