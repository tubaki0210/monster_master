"use client"
import CombinationItem from '@/components/CombinationItem';
import MonsterDetail from '@/components/MonsterDetail';
import Sideber from '@/components/Sideber';
import useMonster from '@/hooks/useMonster';
import useMonsterCombination from '@/hooks/useMonsterCombination';
import useMonsterDetail from '@/hooks/useMonsterDetail';
import { CombinationList, CombinationParentType, CombinationType, NewMonsterType } from '@/type';
import { Mosque } from '@mui/icons-material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr';

const MonsterItem = () => {
    const SearchParams = useSearchParams();
    const monster_id = SearchParams.get("monster_id");
    // モンスターIDを基にモンスター情報を獲得
    const { monster, monstererror } = useMonster(monster_id)
    const { combination, combinationerror } = useMonsterCombination(monster_id)
    const { combination_parent, parent_error } = useMonsterDetail(combination);
    // 全てのデータを読み込めてない場合とエラーが起きた場合
    if (monstererror || combinationerror || parent_error) return <div>エラー</div>
    if (!monster || !combination || !combination_parent) return <div>読み込み...</div>
    return (
        <div className='container m-auto flex justify-center py-5'>
            <Sideber />
            <div className='w-2/3'>
                <div className=''>
                    <div className='text-center text-3xl py-3 font-bold'>モンスター情報</div>
                    <table className='border-collapse w-full'>
                        <tbody>
                            <tr>
                                <td className='border py-4 text-2xl text-center w-1/3 font-bold'>モンスター名</td>
                                <td className='border py-4 text-2xl text-center'>{monster[0]?.name}</td>
                            </tr>
                            <tr>
                                <td className='border py-4 text-2xl text-center w-1/3 font-bold'>ランク</td>
                                <td className='border py-4 text-2xl text-center'><Link href={`/allmonster?rank=${monster[0]?.ranks}`} className='underline text-blue-400 hover:text-blue-500'>{monster[0]?.ranks}</Link></td>
                            </tr>
                            <tr>
                                <td className='border py-4 text-2xl text-center w-1/3 font-bold'>系統</td>
                                <td className='border py-4 text-2xl text-center'><Link href={`/allmonster?status=${monster[0]?.status}`} className='underline text-blue-400 hover:text-blue-500'>{monster[0]?.status}</Link></td>
                            </tr>
                            <tr>
                                <td className='border py-4 text-2xl text-center w-1/3 font-bold'>スカウト可能エリア</td>
                                <td className='border py-4 text-base text-center'>{monster[0]?.scout}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='mt-10'>
                    <div className='text-center text-3xl font-bold py-3'>配合情報</div>
                    {combination_parent?.map((array, index) => (
                        <CombinationItem combination_array={array} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MonsterItem
