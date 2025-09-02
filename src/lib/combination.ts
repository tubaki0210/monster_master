import { CombinationType } from '@/type';
// import { db } from './db';
import { supabase } from './supabase';

interface getCombinationProps {
  monster_id?: string;
  combination_id?: number[];
}

// const getCombination = async (params: getCombinationProps) => {
//   try {
//     // 基本となるクエリ
//     let query = 'SELECT * FROM combinations';

//     // WHERE句の条件と、それに渡すパラメータを格納する配列
//     const whereClauses = [];
//     const queryParams = [];
//     if (params.monster_id) {
//       whereClauses.push('monster_id = ?');
//       queryParams.push(params.monster_id);
//     }

//     if (params.combination_id) {
//       whereClauses.push('combination_id IN (?)');
//       queryParams.push(params.combination_id);
//     }
//     // WHERE句の条件が1つ以上あれば、クエリ文字列に結合
//     if (whereClauses.length > 0) {
//       query += ' WHERE ' + whereClauses.join(' AND ');
//     }

//     // データベースにクエリを発行
//     const [rows] = await db.query(query, queryParams);
//     // console.log(rows)
//     // 結果を型付けして返す
//     // const result = rows
//     // return rows as NewMonsterType[]
//     return rows as CombinationType[];
//   } catch (error) {
//     // エラーが発生した場合は、コンソールにログを出力し、空の配列を返す
//     console.error('Database Error:', error);
//     // または throw new Error('Failed to fetch monsters.'); のようにエラーをスローする
//     return [];
//   }
// };

export async function getCombination(params: getCombinationProps) {
  try {
    // Supabaseのクエリビルダーを開始
    let query = supabase.from('combinations').select('*');

    // パラメータに応じてクエリをチェーンで追加
    if (params.monster_id) {
      query = query.eq('monster_id', params.monster_id);
    }

    if (params.combination_id && params.combination_id.length > 0) {
      query = query.in('combination_id', params.combination_id);
    }

    // 最終的なクエリを実行
    const { data, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch combinations.');
    }

    // 結果を型付けして返す
    return data as CombinationType[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default getCombination;
