import { useMemo } from 'react';
import { NewMonsterType, CombinationType, CombinationParentType } from '@/type';
import { combinationLogic } from '@/lib/combinationLogic';

// 引数として、計算に必要なものをすべて受け取る
interface Props {
  name: string;
  monsters: NewMonsterType[];
  combinations: CombinationType[];
  combinations_parent: CombinationParentType[];
}
export const useFetchMonster = ({
  name,
  monsters,
  combinations,
  combinations_parent,
}: Props) => {
  // nameや各種データが変更された時だけ再計算するようにuseMemoで囲む
  const { combination_result, parent_result } = useMemo(() => {
    // データが揃っていなければ、空の結果を返す
    if (!name || !monsters || !combinations || !combinations_parent) {
      return { combination_result: [], parent_result: [] };
    }
    // ↓↓↓ ここに、既存のfetchMonster内のロジックをそのまま移設する ↓↓↓
    const target_monster = monsters.find((monster) => monster.name === name);
    if (!target_monster) {
      return { combination_result: [], parent_result: [] };
    }
    const { combination_result, parent_result } = combinationLogic({
      target_monster: target_monster,
      monsters: monsters,
      combinations: combinations,
      combinations_parent: combinations_parent,
    });

    // 計算結果をオブジェクトとして返す
    return {
      combination_result: combination_result,
      parent_result: parent_result,
    };
  }, [name, monsters, combinations, combinations_parent]);

  // useMemoが算出した結果を返す
  return { combination_result, parent_result };
};

// function Scroller() {
//   const myRef = useRef(null);

//   const handleClick = () => {
//     // ref.currentがDOM要素を指す
//     if (myRef.current) {
//       myRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       <button onClick={handleClick}>Scroll to Target</button>
//       <div style={{ height: '150vh' }}></div>
//       <h2 ref={myRef}>ここがターゲットです！</h2>
//     </>
//   );
// }
