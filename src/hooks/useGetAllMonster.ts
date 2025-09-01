// import React from 'react'
import useSWR from 'swr';

const useGetAllMonster = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // キーが変わらなければ、再レンダリングされてもfetchは行われずにキャッシュからデータを取得
  const { data, error } = useSWR(`/api/monsters`, fetcher);

  return {
    monsters: data,
    monsterError: error,
  };
};

export default useGetAllMonster;
