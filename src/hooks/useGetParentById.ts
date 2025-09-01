import { CombinationList, CombinationParentType, CombinationType } from '@/type';
// import { error } from 'console';
// import React from 'react'
import useSWR from 'swr';

// interface Props {
//   monster_id : number
// }
const useGetParentById = ( combination : CombinationType[] | undefined) => {
      const fetcher = (url: string) => fetch(url).then(res => res.json())
      const combination_idlist = (combination?.map((comb: CombinationType) => { return comb.combination_id }));
      // 配合IDリストに含まれるモンスターを配合親テーブルから取得
      const { data: combination_parent, error: combination_parent_error } = useSWR(
          combination_idlist ? `/api/combination_parent?combination_id=${combination_idlist.join(',')}` : null, fetcher);
      // 配合情報と配合親情報をコンビネーションIDでグルーピング
      const merged_combination : CombinationList[] | undefined = combination && combination_parent ?
      combination.map((item1: CombinationType) => {
          const parent_item = combination_parent.filter((item: CombinationParentType) => item.combination_id === item1.combination_id)
          const parent_info = parent_item.map((m : CombinationParentType) => {
              return { "parent" : m.parent, "monster_id" : m.monster_id }
          })
          return {
              ...item1,
              topparent: parent_info
          }
      }) : undefined
      return {
        combination_children : merged_combination,
        comb_children_error : combination_parent_error
      }
}

export default useGetParentById
