import { MonsterType, NewMonsterType } from '@/type'
import db_fire from '@/firebase'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import { data } from 'framer-motion/client'

// モンスター名で検索する
const SearchName = async (name1: string, name2: string) => {
    const search_key = [name1, name2].sort().join(',')
    const q = query(
        collection(db_fire, "combination_parent"),
        where("parent_key", "==", search_key)
    )
    const snapShot = await getDocs(q)
    const data = (snapShot.docs.map(doc => doc.data()))
    console.log(data)
    return data
}
// 系統で検索する
const SearchStatus = async (status1: string, status2: string) => {
    const search_key = [status1, status2].sort().join(',')
    const q = query(
        collection(db_fire, "combination_parent"),
        where("parent_key", "==", search_key)
    )
    const snapShot = await getDocs(q)
    const data = (snapShot.docs.map(doc => ({ ...doc.data() })))
    console.log(data)
    return data
}

const getCombinaitonRecord = async (combinatino_id: string) => {
    const q = query(
        collection(db_fire, "combinations"),
        where("__name__", "==", combinatino_id)
    )
    const snapShot = await getDocs(q)
    const data = (snapShot.docs.map(doc => ({ ...doc.data() })))
    return data
}

const getMonster = async (monster_id : string) => {
    const q = query(
        collection(db_fire, "combinations"),
        where("monster_id", "==", monster_id)
    )
    const snapShot = await getDocs(q)
    const data = (snapShot.docs.map(doc => ({ ...doc.data() })))
    console.log(data)
    return data
}

export const getCombination = async (monsert1: MonsterType, monsert2: MonsterType) => {
    const status_result = await SearchStatus(monsert1.status, monsert2.status)
    const name_result = await SearchName(monsert1.name, monsert2.name)
    const new_status_result = [...status_result].sort(() => 0.5 - Math.random())
    const new_result = [...name_result, ...new_status_result]
    // informationに「どちらかF」のような書かれていたら，それで絞り込み
    const combination_records = await Promise.all(
        new_result.map(async (item) => {
            const temp = await getCombinaitonRecord(item.combination_id);
            if (temp[0].information) {
                if (temp[0].information.includes(monsert1.rank) || temp[0].information.includes(monsert2.rank)) {
                    return temp[0]
                }
            } else {
                return temp[0]
            }
        })
    );
    // 配合先のモンスターIDが入ったリスト
    const fileter_combination = combination_records.filter(Boolean)
    // モンスターテーブルからモンスターIDで検索
    console.log(fileter_combination)
    return new_result
};
