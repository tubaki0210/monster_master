import React from 'react';
import { NewMonsterType } from '@/type';
import MonsterDetail from '@/components/MonsterDetail';
import Sideber from '@/components/Sideber';
import SearchBar from '@/components/SearchBar';
import { getMonsters } from '@/lib/monster';
import KindTable from '@/components/KindTable';
import RankTable from '@/components/RankTable';

const AllmonsterPage = async () => {
  const displayedMonsters = await getMonsters({});
  return (
    <div className="container m-auto flex flex-col justify-center items-center mt-10 mb-10 ">
      <Sideber />
      <SearchBar />
      <KindTable />
      <RankTable />
      <div className="w-1/2 mt-5">
        <div className="text-3xl text-center">
          <div>全てのモンスター({displayedMonsters?.length})</div>
        </div>
        <div>
          {displayedMonsters?.map((monster: NewMonsterType) => (
            <MonsterDetail key={monster.monster_id} monster={monster} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default AllmonsterPage;
