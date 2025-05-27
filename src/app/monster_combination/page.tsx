'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import { useEffect } from 'react'
import { CombinationList, CombinationParentType, CombinationType, NewMonsterType } from '@/type'
import CombinationItem from '@/components/CombinationItem'
import { toKana, toHankaku } from '@/lib/change_text'
import Sideber from '@/components/Sideber'
const Monster_Combination = () => {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data: monsters, error: error } = useSWR('/api/monsters', fetcher)
    const [text, setText] = useState<string>('');
    const [searchresult, setSearchResult] = useState<NewMonsterType[]>([]);
    const [combination_result, setCombination] = useState<CombinationList[]>([])
    const [name_list, setName] = useState<string[]>([])

    useEffect(() => {
        const name = monsters?.map((monster: NewMonsterType) => {
            return monster.name
        })
        setName(name)
    },[monsters])
    useEffect(() => {
        if (text === '') {
            setCombination([])
            setSearchResult([])
            return
        }
        // const name_list = monsters.map((monster: NewMonsterType) => {
        //     return monster.name
        // })
        // 候補のフィルタリング
        const filter = monsters.filter((item: NewMonsterType) =>
            item.name.includes(text) || item.katakana.includes(toKana(text)) || item.romaji.includes(toHankaku(text)))
        setSearchResult(filter)

        const fetchMonster = async (name: string) => {
            // モンスターIDを取得する
            const res = await fetch(`/api/monsters?name=${name}`)
            const data: NewMonsterType[] = await res.json()
            const monster_id = data[0].monster_id
            // モンスターIDからコンビネーションIDを検索
            const combination_res = await fetch(`/api/combinations?monster_id=${monster_id}`)
            const combination_data: CombinationType[] = await combination_res.json()
            const combination_id_list = combination_data.map((item => {
                return item.combination_id
            }))
            // 配合に必要なモンスターを検索
            const combination_parent_res = await fetch(`/api/combination_parent?combination_id=${combination_id_list.join(',')}`)
            const combination_parent_data: CombinationParentType[] = await combination_parent_res.json()
            // コンビネーションIDでグルーピング
            const merged: CombinationList[] = combination_data.map((item1: CombinationType) => {
                const parent_item = combination_parent_data.filter((item: CombinationParentType) => item.combination_id === item1.combination_id)
                const parent_info = parent_item?.map((m: CombinationParentType) => {
                    return { "parent": m.parent, "monster_id": m.monster_id }
                })
                return {
                    ...item1,
                    topparent: parent_info
                }
            })
            setCombination(merged)
        }

        if (name_list.includes(text)) {
            fetchMonster(text)
            setSearchResult([])
        } else {
            setCombination([])
        }
    }, [text])

    const SearchCombinations = (monster: NewMonsterType) => {
        setText(monster.name)
    }

    if (!monsters) return <div>読み込み</div>
    if (error) return <div>エラー発生</div>
    return (
        <div className='container flex flex-col items-center m-auto font-serif py-6'>
            <Sideber />
            <div className='relative w-2/3'>
                <div className='text-center text-3xl p-2'>モンスター名を入力してください</div>
                <input className='outline-none text-5xl px-2 py-5 w-full bg-white border-2 border-gray-300 text-center' value={text} onChange={(e) => setText(e.target.value)} placeholder='キングスライム' />
                <ul className='w-full max-h-25 overflow-y-scroll bg-gray-100 z-30 text-2xl' >
                    {searchresult?.map((monster, index) => (
                        <li onClick={() => SearchCombinations(monster)} key={monster.monster_id} className='py-0.5 hover:bg-gray-300 cursor-pointer'>{monster.name}</li>
                    ))}
                </ul>
            </div>
            <div className='w-2/3'>
                {combination_result.map((array, index) => (
                    <CombinationItem combination_array={array} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Monster_Combination
