// import React from 'react'
import useSWR from 'swr';

const useGetMonster = ( monster_id : string | null) => {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
      // モンスターIDを基にモンスター情報を獲得
    const { data : monster, error : monstererror } = useSWR(monster_id ? `/api/monsters?monster_id=${monster_id}` : '/api/monsters', fetcher);
  console.log(monster)
  return {
    monsters : monster,
    monsterError : monstererror
  }
}

export default useGetMonster
