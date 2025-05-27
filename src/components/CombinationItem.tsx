import { CombinationList, IdParent } from '@/type'
import Link from 'next/link'
import React from 'react'

interface CombinationItemProps {
    combination_array: CombinationList
}

interface Parent {
    parent: string,
    monster_id: number
}

const Monster = (props: Parent) => {
    // 系統名なら、系統別モンスター一覧のページに遷移させるためのフィルター
    const status_filter = [
        "スライム系",
        "ドラゴン系",
        "自然系",
        "魔獣系",
        "悪魔系",
        "ゾンビ系",
        "物質系",
        "魔王系"
    ]
    // フィルターにかかった場合
    if (status_filter.includes(props.parent)) {
        return (
            <div className='text-2xl w-55 h-50 rounded-2xl bg-green-200 flex items-center justify-center'>
                <Link href={`/allmonster?status=${props.parent}`} className='underline  text-blue-400 hover:text-blue-500'>{props.parent}</Link>
            </div>
        )
    }
    // かからない場合 
    else {
        return (
            <div className='text-2xl w-55 h-50 rounded-2xl bg-green-200 flex items-center justify-center'>
                <Link href={`/monster?monster_id=${props.monster_id}`} className='underline  text-blue-400 hover:text-blue-500'>{props.parent}</Link>
            </div>
        )
    }
}

const DispContent = (array: { monster_id: number, parent: string }[]) => {
    // 四体配合の場合
    if (array.length === 4) {
        return (
            <div className='flex justify-between'>
                <div className='flex flex-col justify-between h-110'>
                    <Monster parent={array[0].parent} monster_id={array[0].monster_id} />
                    <Monster parent={array[1].parent} monster_id={array[1].monster_id} />
                </div>
                <span className='text-9xl flex items-center'>＋</span>
                <div className='flex flex-col justify-between h-110'>
                    <Monster parent={array[2].parent} monster_id={array[2].monster_id} />
                    <Monster parent={array[3].parent} monster_id={array[3].monster_id} />
                </div>
            </div>
        )
    } 
    // ２体配合の場合
    else {
        return (
            <div className='flex justify-between'>
                <Monster parent={array[0].parent} monster_id={array[0].monster_id} />
                <span className='text-9xl flex items-center'>＋</span>
                <Monster parent={array[1].parent} monster_id={array[1].monster_id} />
            </div>
        )
    }
}

export default function CombinationItem(props: CombinationItemProps) {
    return (
        <div className='bg-white p-8 mt-3 rounded-2xl relative'>
            <div className='absolute top-1 left-1/2 -translate-x-1/2 text-2xl'>{props.combination_array.information}</div>
            {DispContent(props.combination_array.topparent)}
        </div>
    )
}
