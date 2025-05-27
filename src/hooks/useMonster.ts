import React from 'react'
import useSWR from 'swr';

const useMonster = ( monster_id : string | null) => {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
      // モンスターIDを基にモンスター情報を獲得
    const { data : monster, error : monstererror } = useSWR(`/api/monsters?monster_id=${monster_id}`, fetcher);
  return {
    monster : monster,
    monstererror : monstererror
  }
}

export default useMonster
