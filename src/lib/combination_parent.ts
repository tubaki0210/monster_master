import {
  CombinationAndParentType,
  CombinationParentType,
  // CombinationType,
} from '@/type';
// import { db } from './db';
import { supabase } from './supabase';

interface getCombinationParentProps {
  combination_id?: number[];
  name?: string;
}

// export async function getCombinationParent(params: getCombinationParentProps) {
//   try {
//     // 基本となるクエリ
//     let query = 'SELECT * FROM combination_parent';

//     // WHERE句の条件と、それに渡すパラメータを格納する配列
//     const whereClauses = [];
//     const queryParams = [];
//     if (params.combination_id && params.combination_id.length > 0) {
//       whereClauses.push('combination_id IN (?)');
//       queryParams.push(params.combination_id);
//     }

//     if (params.name) {
//       whereClauses.push('parent = ?');
//       queryParams.push(params.name);
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
//     return rows as CombinationParentType[];
//   } catch (error) {
//     // エラーが発生した場合は、コンソールにログを出力し、空の配列を返す
//     console.error('Database Error:', error);
//     // または throw new Error('Failed to fetch monsters.'); のようにエラーをスローする
//     return [];
//   }
// }

export async function getCombinationParent(params: getCombinationParentProps) {
  try {
    // Start with the base query
    let query = supabase.from('combination_parent').select('*');

    // Apply filters based on the provided parameters
    if (params.combination_id && params.combination_id.length > 0) {
      query = query.in('combination_id', params.combination_id);
    }

    if (params.name) {
      query = query.eq('parent', params.name);
    }

    // Execute the final query
    const { data, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch combination parents.');
    }

    // Return the result
    return data as CombinationParentType[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

interface getCombinationAndParentsProps {
  monster_id: string;
}

export async function getCombinationAndParents(
  params: getCombinationAndParentsProps
) {
  try {
    const { data, error } = await supabase
      .from('combinations')
      .select(
        `
        *,
        combination_parent(
          monster_id,
          parent
        )
      `
      )
      .eq('monster_id', params.monster_id);

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch combination and parents.');
    }

    // 取得したデータをそのまま返す
    return data as CombinationAndParentType[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default getCombinationParent;
