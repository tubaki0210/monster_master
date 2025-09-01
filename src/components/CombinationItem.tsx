import { CombinationList } from '@/type';
import Link from 'next/link';
import React from 'react';

interface Parent {
  parent: string;
  monster_id: number;
}

const Monster = ({ parent, monster_id }: Parent) => {
  // 系統名なら、系統別モンスター一覧のページに遷移させるためのフィルター
  let filter;
  if (parent === 'スライム系') {
    filter = 'slime';
  } else if (parent === 'ドラゴン系') {
    filter = 'doragon';
  } else if (parent === '自然系') {
    filter = 'sizen';
  } else if (parent === '魔獣系') {
    filter = 'maju';
  } else if (parent === '悪魔系') {
    filter = 'akuma';
  } else if (parent === 'ゾンビ系') {
    filter = 'zombi';
  } else if (parent === '物質系') {
    filter = 'busitu';
  } else if (parent === '魔王系') {
    filter = 'maou';
  }
  const status_filter = [
    'スライム系',
    'ドラゴン系',
    '自然系',
    '魔獣系',
    '悪魔系',
    'ゾンビ系',
    '物質系',
    '魔王系',
  ];
  // フィルターにかかった場合
  if (status_filter.includes(parent)) {
    return (
      <div className="text-2xl w-55 h-50 rounded-2xl bg-green-200 flex items-center justify-center">
        <Link
          href={`/allmonster/kind/${filter}`}
          className="underline  text-blue-400 hover:text-blue-500"
        >
          {parent}
        </Link>
      </div>
    );
  }
  // かからない場合
  else {
    return (
      <div className="text-2xl w-55 h-50 rounded-2xl bg-green-200 flex items-center justify-center">
        <Link
          href={`/monster/${monster_id}`}
          className="underline  text-blue-400 hover:text-blue-500"
        >
          {parent}
        </Link>
      </div>
    );
  }
};

interface DispContentProps {
  monster: Parent[];
}

const DispContent = ({ monster }: DispContentProps) => {
  // 四体配合の場合
  if (monster.length === 4) {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col justify-between h-110">
          <Monster
            parent={monster[0].parent}
            monster_id={monster[0].monster_id}
          />
          <Monster
            parent={monster[1].parent}
            monster_id={monster[1].monster_id}
          />
        </div>
        <span className="text-9xl flex items-center">＋</span>
        <div className="flex flex-col justify-between h-110">
          <Monster
            parent={monster[2].parent}
            monster_id={monster[2].monster_id}
          />
          <Monster
            parent={monster[3].parent}
            monster_id={monster[3].monster_id}
          />
        </div>
      </div>
    );
  }
  // ２体配合の場合
  else {
    return (
      <div className="flex justify-between">
        <Monster
          parent={monster[0].parent}
          monster_id={monster[0].monster_id}
        />
        <span className="text-9xl flex items-center">＋</span>
        <Monster
          parent={monster[1].parent}
          monster_id={monster[1].monster_id}
        />
      </div>
    );
  }
};

interface CombinationItemProps {
  combinationItem: CombinationList;
}
const CombinationItem = ({ combinationItem }: CombinationItemProps) => {
  return (
    <div className="bg-white p-8 mt-3 rounded-2xl relative">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-2xl">
        {combinationItem.information}
      </div>
      <DispContent monster={combinationItem.topparent} />
    </div>
  );
};

interface CombinationResultProps {
  combinationResult: CombinationList[];
}

const CombinationResult = ({ combinationResult }: CombinationResultProps) => {
  return (
    <div>
      {combinationResult.map((combinationItem, index) => (
        <CombinationItem combinationItem={combinationItem} key={index} />
      ))}
    </div>
  );
};

export default CombinationResult;
