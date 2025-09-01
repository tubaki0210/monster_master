// import React from 'react'
import useSWR from 'swr';

const useMonsterList = (id_list: number[] | undefined) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: monster, error: monstererror } = useSWR(
    id_list ? `/api/monsters?ids=${id_list}` : null,
    fetcher
  );
  console.log(monster);
  return {
    parent: monster,
    parent_error: monstererror,
  };
};
const name = 'Taro';
export default useMonsterList;
