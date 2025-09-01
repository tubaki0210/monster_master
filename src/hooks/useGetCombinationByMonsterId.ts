// import React from 'react'
import useSWR from 'swr';

const useGetCombinationByMonsterId = (monster_id: string | null) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // モンスターIDを基にモンスター情報を獲得
  const { data: combination, error: combinationerror } = useSWR(
    monster_id
      ? `/api/combinations?monster_id=${monster_id}`
      : `/api/combinations`,
    fetcher
  );
  return {
    combinations: combination,
    combinationError: combinationerror,
  };
};

export default useGetCombinationByMonsterId;
