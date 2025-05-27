"use client"
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { NewMonsterType } from '@/type'
import MonsterDetail from '@/components/MonsterDetail'
import Sideber from '@/components/Sideber'
const allmosnter = () => {
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const searchParams = useSearchParams()
  const status_params = searchParams.get('status')
  const rank_params = searchParams.get('rank');
  const query = new URLSearchParams();
  if (status_params) query.set('status', status_params);
  if (rank_params) query.set('rank', rank_params);
  const { data, error, isLoading } = useSWR(`/api/monsters${query.toString() ? `?${query.toString()}` : ''}`, fetcher)

  if (error) return <div>エラーです</div>;
  if (isLoading) return <div>読み込み中...</div>

  return (
    <div className='container m-auto flex flex-col justify-center items-center mt-10 mb-10 '>
      <Sideber />
      <table className='border border-collapse w-1/2'>
        <thead>
          <tr>
            <th colSpan={2} className='border p-3'><div className='text-3xl'>系統</div></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border py-4 text-2xl text-center'><Link href={`/allmonster?status=スライム系`} className='underline text-blue-400 hover:text-blue-500'>スライム系</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=ドラゴン系`} className='underline text-blue-400 hover:text-blue-500'>ドラゴン系</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=悪魔系`} className='underline text-blue-400 hover:text-blue-500'>悪魔系</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=物質系`} className=' underline text-blue-400 hover:text-blue-500'>物質系</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=ゾンビ系`} className='underline text-blue-400 hover:text-blue-500'>ゾンビ系</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=魔獣系`} className='underline text-blue-400 hover:text-blue-500'>魔獣系</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=自然系`} className='underline text-blue-400 hover:text-blue-500'>自然系</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?status=魔王系`} className='underline text-blue-400 hover:text-blue-500'>魔王系</Link></td>
          </tr>
        </tbody>
      </table>

      <table className='border border-collapse mt-10 w-1/2'>
        <thead>
          <tr>
            <th colSpan={2} className='border p-3 text-3xl'>ランク</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border py-4 text-2xl text-center'><Link href={`/allmonster?rank=G`} className='underline text-blue-400 hover:text-blue-500'>Gランク</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=F`} className='underline text-blue-400 hover:text-blue-500'>Fランク</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=E`} className='underline text-blue-400 hover:text-blue-500'>Eランク</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=D`} className='underline text-blue-400 hover:text-blue-500'>Dランク</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=C`} className='underline text-blue-400 hover:text-blue-500'>Cランク</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=B`} className='underline text-blue-400 hover:text-blue-500'>Bランク</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=A`} className='underline text-blue-400 *:hover:text-blue-500'>Aランク</Link></td>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=S`} className='underline text-blue-400 hover:text-blue-500'>Sランク</Link></td>
          </tr>
          <tr>
            <td className='border  py-4 text-2xl text-center'><Link href={`/allmonster?rank=X`} className='underline text-blue-400 hover:text-blue-500'>Xランク</Link></td>
            <td className='border  py-4 text-2xl text-center'></td>
          </tr>
        </tbody>
      </table>
      <div className='w-1/2 mt-5'>
        <div className='text-3xl text-center'>
          {status_params && <div>{status_params}のモンスター({data?.length})</div>}
          {rank_params && <div>{rank_params}ランクのモンスター({data?.length})</div>}
          {(!status_params && !rank_params) && <div>全てのモンスター({data?.length})</div>}
        </div>
        <div>
          {data?.map((monster: NewMonsterType) => (
            <MonsterDetail  key={monster.monster_id}  monster={monster} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default allmosnter
