import React, { useEffect, useState } from 'react'
import Monster from './Monster'
import { motion } from 'framer-motion';
import { NewMonsterType } from '../type';
import SearchIcon from '@mui/icons-material/Search';
import useSWR from 'swr';
interface Props {
  scoutMonsters : NewMonsterType[],
  setScoutMonsters : (scoutMonsters : NewMonsterType[]) => void,
  handMonsters : NewMonsterType[],
  setHandMonsters : (handMonsters : NewMonsterType[]) => void,
  setDelayNum : (num : number) => void
}

const Scout = (props: Props) => {
  const fetcher = (url:string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/monsters',fetcher);
  const [searchresult, setSearchResult] = useState<NewMonsterType[]>([])
  const [searchtext, setSearchtext] = useState<string>('')
  console.log(data)
  const handleScoutMonster = ( monster : NewMonsterType ) => {
    if (props.handMonsters.length > 3) {
      return
    }
    // props.setDelayNum()
    props.setHandMonsters([...props.handMonsters,monster])
    const new_scout = props.scoutMonsters.filter(item => item !== monster)
    props.setScoutMonsters(new_scout)
  }

  const SearchMonster = async () => {
    if (props.scoutMonsters.length > 2) {
      return
    } 
    setSearchtext('')
    const res = await fetch(`/api/monsters?name=${searchtext}`)
    const data = await res.json()
    // console.log(...data)
    props.setScoutMonsters([...props.scoutMonsters, ...data ])
  }

  useEffect(() => {
    if (searchtext === '') {
      setSearchResult([])
      return
    }
    const filter = data.filter((monster :NewMonsterType) => monster.name.includes(searchtext))
     setSearchResult(filter)
  }, [searchtext])

  if (error) return <div>エラー</div>
  if (isLoading) return <div>読み込み</div>
  return (
    <section className='w-1/5'>
      <div className='border-3 border-blue-300 rounded-2xl relative px-2  flex flex-col items-center'>
        <div className='mt-6 flex justify-center'>
          <div className='relative'>
            <input type='text' className='p-1 w-full bg-white' value={searchtext} onChange={(e) => setSearchtext(e.target.value)} />
            <ul className='w-full max-h-25 overflow-y-scroll bg-gray-100 absolute z-30'>
              {searchresult.map((monster) => (
                <li onClick={() => setSearchtext(monster.name)} key={monster.monster_id} className='hover:bg-gray-300 cursor-pointer'>{monster.name}</li>
              ))}
            </ul>
          </div>
          <div className='px-2 py-1 cursor-pointer' onClick={SearchMonster}><SearchIcon /></div>
        </div>
        <span className='px-3 text-xl font-bold absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-100'>スカウト</span>
        <ul className='mt-2 flex flex-col items-center'>
          {props.scoutMonsters.map((monster, index) => (
            <motion.li
              key={index}
              className='py-6'
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 330, duration: 1, delay: 0.3 }}
            >
              <div
                className={`relative rounded-2xl hover:scale-90 cursor-pointer transition-all duration-300 bg-amber-200`}
                onClick={() => handleScoutMonster(monster)}
              >
                <Monster monster={monster} />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Scout
