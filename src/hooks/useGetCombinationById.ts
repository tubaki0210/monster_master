// import React from 'react'
import useSWR from 'swr';

const useGetCombinationById = (combination_id_list: number[] | undefined) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: combination_prev, error: combinationpreverror } = useSWR(
    combination_id_list
      ? `/api/combinations?combination_id=${combination_id_list}`
      : null,
    fetcher
  );
  return {
    combination_parent: combination_prev,
    comb_parent_error: combinationpreverror,
  };
};

export default useGetCombinationById;
