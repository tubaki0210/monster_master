import { CombinationList, NewMonsterType } from '@/type';
import getCombinationParent, {
  getCombinationAndParents,
} from './combination_parent';
import getCombination from './combination';
import { getMonsters } from './monster';

export const getMonseterCombParent = async (monster: NewMonsterType) => {
  const combinationParent = await getCombinationAndParents({
    monster_id: String(monster.monster_id),
  });
  // 配合情報
  const combination_result: CombinationList[] = combinationParent.map((t) => {
    const { combination_parent, ...rest } = t;
    const ti = combination_parent;
    return { ...rest, topparent: ti };
  });
  // ここまで
  const parentName = await getCombinationParent({ name: monster.name });
  let filter = parentName.map((item) => item.combination_id);
  const parent = await getCombination({ combination_id: filter });
  filter = parent.map((item) => {
    return item.monster_id;
  });
  // このモンスターで作れるモンスター
  const parent_result = await getMonsters({ ids: filter });
  return {
    combination_result,
    parent_result,
  };
};
