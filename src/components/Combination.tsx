import React, { useEffect, useState } from 'react'
import { CombinationParentType, CombinationType, MonsterType, NewMonsterType } from '../type'
import Monster from './Monster'
import { motion, AnimatePresence, scale } from 'framer-motion'
import Parent from './Parent'
import { getCombination } from '@/utils/handlefirebase'

interface Props {
  parent1: NewMonsterType | null,
  parent2: NewMonsterType | null,
  // all_monsters: NewMonsterType[],
  handMonsters: NewMonsterType[],
  setParent1: (monster: NewMonsterType | null) => void,
  setParent2: (monster: NewMonsterType | null) => void,
  setHandMonsters: (monster: NewMonsterType[]) => void,
  setDelayNum: (delay_num: number) => void,
}

interface Combination {
  combination_parent_id : number,
  combination_id : number,
  parent : string
}

const Combination = (props: Props) => {
  const [CombinaitonMonsters, setCombinaitonMonster] = useState<NewMonsterType[]>([]);
  const [selected_monster, setSelectedMonster] = useState<NewMonsterType | null>(null);
  const [combination_flag, setCombinationFlag] = useState<boolean>(false);

  const handleCombination = (monster: NewMonsterType) => {
    let new_hand = props.handMonsters.filter(item => ((item !== props.parent1) && (item !== props.parent2)))
    monster.parent1 = props.parent1?.name
    monster.parent2 = props.parent2?.name
    new_hand.push(monster)
    setCombinationFlag(true)

    setTimeout(() => {
      props.setParent1(null)
      props.setParent2(null)
    }, 100)

    props.setHandMonsters(new_hand)
    props.setDelayNum(1)
    setSelectedMonster(monster)
  }

  useEffect( () => {
    const fetchMonster = async (monster1 : NewMonsterType, monster2 : NewMonsterType) => {
      try{
        // 2体のモンスターを配合に使う他のモンスターを全て獲得
        const res = await fetch(`/api/combination_parent?name1=${monster1.name}&status1=${monster1.status}&name2=${monster2.name}&status2=${monster2.status}`);
        // 名前と系統で検索した結果（[{"name_rows" : [{}], "status_rows" : [{}]}]）
        const data = await res.json()
        // 配合先候補のモンスターのcombination_idを格納する
        const status_data : CombinationParentType[] = [...data.status_rows].sort(() => 0.5 - Math.random())
        // 配合先候補のcombination_idのリスト[1,2,3,4,...]
        const cancat_data : Number[] = [...data.name_rows, ...status_data].map((item) => { return item.combination_id })
        // 配合先候補のcombinationsテーブルのレコードを全て獲得
        const results = await fetch(`/api/combinations?combination_id=${cancat_data.join(',')}`);
        const result_data : CombinationType[] = await results.json()
        // 「どちらかG」などの条件がついているものは親の系統を見て絞り込み
        let final_result : CombinationType []  = result_data.filter((item : CombinationType) => {
          if (item.information) {
            if (props.parent1?.ranks && item.information.includes(props.parent1?.ranks) || props.parent2?.ranks && item.information.includes(props.parent2?.ranks)) {
              return item
            }
          } else {
            return item
          }
        })
        // 配合先のモンスターのcombinationレコードをソート
        final_result = final_result.sort(() => 0.5 - Math.random())
        // モンスターテーブルからモンスターを検索
        const monster_ids = final_result.map((item) => { return item.monster_id })
        const monster_ids_res = await fetch(`/api/monsters?ids=${monster_ids.join(',')}`)
        const monster_ids_data : MonsterType[] = await monster_ids_res.json()
        const monster_map = new Map(monster_ids_data.map(mon => [mon.monster_id, mon]))
        const monster_search = final_result.map((item) => {
          return monster_map.get(item.monster_id) ?? null
        }) .filter((mon): mon is NewMonsterType => mon !== null && mon !== undefined && (mon.monster_id !== props.parent1?.monster_id && mon.monster_id !== props.parent2?.monster_id));
        // 配合先のモンスターの候補を獲得し、先頭の３体をセットする
        console.log(monster_search)
        setCombinaitonMonster(monster_search.slice(0,3))
      }catch(error) {
        console.log(error)
      }
    }
    if (props.parent1 !== null && props.parent2 !== null) {
      //配合検索する
      fetchMonster(props.parent1, props.parent2) 
    } else {
      setCombinaitonMonster([])
    }
  }, [props.parent1, props.parent2])

  useEffect(() => {
    if (props.parent1 === null && props.parent2 === null && combination_flag) {
      setCombinationFlag(false)
    }
  }, [props.parent1, props.parent2, combination_flag])

  return (
    <section className='w-1/2 '>
      <div className='border-3 border-blue-300 rounded-2xl relative px-2 py-10'>
        <span className='px-3  text-xl font-bold absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-100'>配合エリア</span>
        <div className='flex flex-col'>
          {/*配合先のモンスター*/}
          <div>
            <div className='flex justify-between h-32 py-1  px-0.5 border-2 border-green-500 rounded-2xl'>
              <AnimatePresence>
                {CombinaitonMonsters.map((monster, index) => (
                  monster && (
                    <motion.div
                      key={index}
                      className='bg-blue-200 rounded-2xl hover:scale-90  cursor-pointer'
                      onClick={() => handleCombination(monster)}
                      initial={{ opacity: 0, scale: 0.6, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.0,
                        transition: (combination_flag && selected_monster === monster) ? { duration: 1.0, delay: 0, ease: [0.7, 0, 0.9, 1] } : { duration: 0.3, delay: 0 }
                      }}
                      transition={{ type : 'spring', stiffness : 300, duration: 0.5, delay: 0.2 }}>
                      <Monster monster={monster} />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            <h1 className='text-center font-bold text-2xl mt-3 text-green-500'>生まれる子供</h1>
          </div>

          {/*親モンスターの定義*/}
          <div className='flex justify-around mt-20'>
            {/*親１*/}
            <div className='flex flex-col items-center'>
              <div className='w-50 h-27  border-2  border-red-500 rounded-2xl flex justify-center items-center'>
                <AnimatePresence>
                  {props.parent1 ?
                    <Parent parent={props.parent1} combination_flag={combination_flag} />
                    : null}
                </AnimatePresence>
              </div>
              <h1 className='mt-2 text-2xl font-bold text-red-500'>親１</h1>
            </div>
            {/* 親２ */}
            <div className='flex flex-col items-center'>
              <div className=' w-50 h-27 border-2 border-blue-600 rounded-2xl flex justify-center items-center'>
                <AnimatePresence>
                  {props.parent2 ?
                    <Parent parent={props.parent2} combination_flag={combination_flag} />
                    : null}
                </AnimatePresence>
              </div>
              <h1 className='mt-2 text-2xl font-bold text-blue-600'>親２</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Combination
