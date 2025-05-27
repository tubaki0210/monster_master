import React from 'react'
import useSWR from 'swr';

const useMonsterCombination = ( monster_id : string | null ) => {
      const fetcher = (url: string) => fetch(url).then(res => res.json())
      // モンスターIDを基にモンスター情報を獲得
      const { data : combination, error : combinationerror } = useSWR(`/api/combinations?monster_id=${monster_id}`, fetcher);
      return {
        combination : combination,
        combinationerror : combinationerror
      }
}

export default useMonsterCombination
