'use client'

import React from 'react'
import { MonsterType, NewMonsterType } from '../type'
import { motion } from 'framer-motion'

interface MonsterProps {
    monster:  NewMonsterType,
}

const Monster = ({ monster }: MonsterProps) => {
    return (
        <div className='px-4 py-6 w-49 h-26  rounded-2xl flex flex-col items-center '>
            <div className='text-30 font-bold text-purple-600'>{monster.name}</div>
            <div className='w-full flex justify-around mt-3'><span>{monster.ranks}ランク</span><span>{monster.status}</span></div>
        </div>
    )
}

export default Monster
