'use client'
import React, { useEffect, useState } from 'react'
import Hand from './Hand'
import Scout from './Scout'
import Combination from './Combination'
import ItemList from './ItemList'
import { MonsterType, NewMonsterType } from '../type'
import useSWR from 'swr'


const SetMonsters = (monsters: NewMonsterType[], list: string[]) => {
  const result: NewMonsterType[] = []
  for (const rank of list) {
    const candidate = monsters.filter((item: NewMonsterType) =>
      item.ranks === rank && !result.some((monster) => monster.status === item.status)
    )
    if (candidate.length > 0) {
      result.push(candidate[Math.floor(Math.random() * candidate.length)])
    }
  }
  return result
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Content = () => {
  const { data, error, isLoading } = useSWR('/api/monsters', fetcher)
  const [target_monster, setTargetMonster] = useState<NewMonsterType>()
  const [parent1, setParent1] = useState<NewMonsterType | null>(null)
  const [parent2, setParent2] = useState<NewMonsterType | null>(null)
  const [handMonsters, setHandMonsters] = useState<NewMonsterType[]>([])
  const [scoutMonsters, setScoutMonsters] = useState<NewMonsterType[]>([])
  const [delay_num, setDelayNum] = useState<number>(0);

  useEffect(() => {
    if (!data || error) return;

    const target_list: NewMonsterType[] = data.filter((item: NewMonsterType) =>
      item.ranks === 'S' || item.ranks === 'X'
    )
    const target = target_list[Math.floor(Math.random() * target_list.length)]
    setTargetMonster(target)
    const hand_filter: NewMonsterType[] = data.filter((item: NewMonsterType) =>
      item !== target
    )
    let handmonsters: NewMonsterType[] = SetMonsters(hand_filter, ["D", "E", "F", "G"])
    const scout_filter: NewMonsterType[] = data.filter((item: NewMonsterType) =>
      !handMonsters.includes(item)
    )
    const scoutmonsters: NewMonsterType[] = SetMonsters(scout_filter, ["D", "E", "F"])
    // console.log(scoutmonsters)
    console.log(handmonsters.length)
    setHandMonsters(handmonsters)
    setScoutMonsters(scoutmonsters.slice(0, 2))
  }, [data, error]);

  if (isLoading) return <div>読み込み</div>
  if (error) return <div>エラーが発生</div>
  return (
    <div className='w-320 mx-auto flex justify-between px-3 py-12 font-serif relative'>
      {
        target_monster &&
        <div className='absolute top-1'>
          <div>お題：{target_monster?.name}</div>
        </div>
      }
      <Hand parent1={parent1} parent2={parent2} setParent1={setParent1} setParent2={setParent2} handMonsters={handMonsters} delay_num={delay_num} />
      <Scout scoutMonsters={scoutMonsters} setScoutMonsters={setScoutMonsters} 
        handMonsters={handMonsters} setHandMonsters={setHandMonsters} setDelayNum={setDelayNum} />
      <Combination parent1={parent1} parent2={parent2} handMonsters={handMonsters} setParent1={setParent1}
        setParent2={setParent2} setHandMonsters={setHandMonsters} setDelayNum={setDelayNum} />
      <ItemList />
    </div>
  )
}

export default Content
