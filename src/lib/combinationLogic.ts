import { CombinationParentType, CombinationType, NewMonsterType } from '@/type';

interface Props {
  target_monster: NewMonsterType;
  monsters: NewMonsterType[];
  combinations: CombinationType[];
  combinations_parent: CombinationParentType[];
}
export const combinationLogic = ({
  target_monster,
  monsters,
  combinations,
  combinations_parent,
}: Props) => {
  const monster_id = target_monster.monster_id;
  const combination_data = combinations.filter(
    (comb) => comb.monster_id === monster_id
  );
  const combination_id_list = combination_data.map(
    (item) => item.combination_id
  );
  const combination_parent_data = combinations_parent.filter((comb_parent) =>
    combination_id_list.includes(comb_parent.combination_id)
  );

  const merged = combination_data.map((item1) => {
    const parent_item = combination_parent_data.filter(
      (item) => item.combination_id === item1.combination_id
    );
    const parent_info = parent_item.map((m) => ({
      parent: m.parent,
      monster_id: m.monster_id,
    }));
    return { ...item1, topparent: parent_info };
  });

  const children = combinations_parent.filter(
    (comb_parent) => comb_parent.parent === target_monster.name
  );
  let filter = children.map((item) => item.combination_id);
  const parent = combinations.filter((comb) =>
    filter.includes(comb.combination_id)
  );
  filter = parent.map((item) => item.monster_id);
  const p = monsters.filter((monster) => filter.includes(monster.monster_id));
  // 計算結果をオブジェクトとして返す
  return { combination_result: merged, parent_result: p };
};
