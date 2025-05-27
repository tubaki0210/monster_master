'use client'
import React, { useEffect, useRef, useState } from 'react'
import Monster from './Monster'
import { motion } from 'framer-motion'
import { MonsterType, NewMonsterType } from '../type'

interface Props {
  parent1 : NewMonsterType | null,
  setParent1 : (monster : NewMonsterType | null) => void,
  parent2 : NewMonsterType | null,
  setParent2 : (monster : NewMonsterType | null) => void,
  handMonsters : NewMonsterType[]
  delay_num : number,
}

const Hand = ( props  : Props) => {
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [hovermonster, setHoverMonster] = useState<NewMonsterType | null>(null);

  const SelectHandMonster = ( monster : NewMonsterType ) => { 
    if (props.parent1 === monster) {
      props.setParent1(null)
    } else if (props.parent2 === monster) {
      props.setParent2(null)
    } else {
      if (props.parent1 === null) {
        props.setParent1(monster)
      } else if (props.parent2 === null) {
        props.setParent2(monster)
      } 
    }
  }
  const handleMouseEnter = ( monster  : NewMonsterType) => {
    timeRef.current = setTimeout (() => {
      setHoverMonster(monster)
    },600);
  }

  const handleMouseLeave = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    setHoverMonster(null)
  };

  return (
    <section className='w-1/5'>
      <div className='border-3 border-blue-300 rounded-2xl relative px-2'>
        <span className='px-3 text-xl font-bold absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-100'>手持ち</span>
        <ul className='mt-2 flex flex-col items-center'>
          {props.handMonsters.map((monster, index) => (
            <motion.li
            key={monster.monster_id}
            className='py-6'
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 330, duration: 1, delay : props.delay_num }}
            >
              <div onClick={() => SelectHandMonster(monster)} 
              className={`relative rounded-2xl ${((monster === props.parent1) || (monster === props.parent2)) ? 'bg-pink-200' : ' bg-amber-100'}
              hover:scale-90 cursor-pointer transition-all duration-300`}
              onMouseEnter={() => handleMouseEnter(monster)}
              onMouseLeave={handleMouseLeave}
              >
                {
                monster === hovermonster &&
                monster.parent1 && 
                <div className='absolute w-49 h-26 rounded-2xl bg-blue-200 flex flex-col items-center justify-center'>
                  <div>{monster.parent1}</div>
                  <div>{monster.parent2}</div>
                </div>
                }
                <Monster monster={monster} />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hand
