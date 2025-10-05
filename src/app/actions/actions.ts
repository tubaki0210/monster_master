'use server';
import { getMonsters } from '@/lib/monster';
import { getMonseterCombParent } from '@/lib/MonsterCombParent';

export const SearchMonster = async (monster_name: string) => {
  const monster = await getMonsters({ name: monster_name });
  const target_monster = monster[0];
  if (!target_monster) {
    return {
      error: 'そのモンスターはいません。',
      combination_result: null,
      parent_result: null,
    };
  }

  // いた場合
  const { combination_result, parent_result } = await getMonseterCombParent(
    target_monster
  );
  return {
    error: null,
    combination_result: combination_result,
    parent_result: parent_result,
  };
};
