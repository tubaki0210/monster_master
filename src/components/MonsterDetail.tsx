import { NewMonsterType } from '@/type'
import Link from 'next/link'
import React from 'react'

interface Props {
    monster: NewMonsterType
}

const MonsterDetail = (props: Props) => {
    return (
        <div className='flex items-center border-2 p-5 mt-5 justify-between'>
            <div className='flex flex-col items-center w-1/5'>
                <Link href={`/monster?monster_id=${props.monster.monster_id}`} className='underline text-blue-400 hover:text-blue-500'>
                <span key={props.monster.monster_id}>{props.monster.name}</span></Link>
                <div className='flex'>
                    <span>({props.monster.ranks})</span>
                    <span className='ml-2'>{props.monster.status}</span>
                </div>
            </div>
            <div className='text-sm w-3/5 p-1 text-center'>{props.monster.scout}</div>
        </div>
    )
}

export default MonsterDetail
