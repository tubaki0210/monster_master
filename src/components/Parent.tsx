import { motion, AnimatePresence, number } from 'framer-motion'
import React from 'react'
import Monster from './Monster'
import { MonsterType } from '../type'

interface Props {
    parent : MonsterType,
    combination_flag : boolean
}

const Parent = (props : Props) => {
  return (
    <div className='w-full'>
      {props.parent ?(
        <motion.div
          className='rounded-2xl bg-pink-200'
          initial={{ opacity: 0, scale: 0.6, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.0, // 画面から縮小して消える
            transition : props.combination_flag ? { duration : 1.0 } : { duration : 0.3 }
          }}
          transition={{  duration: 0.3, }}
        >
          <Monster monster={props.parent} />
        </motion.div>
      ):(null)
    }
    </div>
  )
}

export default Parent
