import { NewMonsterType } from '@/type';
// import { db } from './db';
import { supabase } from './supabase';

// paramsオブジェクトを受け取り、それに応じてデータを取得する非同期関数

interface getMonstersProps {
  kind?: string;
  rank?: string;
  monster_id?: string;
  name?: string;
  ids?: number[];
}

// export async function getMonsters(params: getMonstersProps) {
//   try {
//     // 基本となるクエリ
//     let query = 'SELECT * FROM monsters';

//     // WHERE句の条件と、それに渡すパラメータを格納する配列
//     const whereClauses = [];
//     const queryParams = [];

//     // もしstatusパラメータがあれば、条件と値を追加
//     if (params.kind) {
//       whereClauses.push('status_romaji = ?');
//       queryParams.push(params.kind);
//     }

//     // もしrankパラメータがあれば、条件と値を追加
//     if (params.rank) {
//       whereClauses.push('ranks = ?'); // あなたのDBのカラム名に合わせてください
//       queryParams.push(params.rank);
//     }

//     if (params.monster_id) {
//       whereClauses.push('monster_id = ?');
//       queryParams.push(params.monster_id);
//     }

//     if (params.name) {
//       whereClauses.push('name = ?');
//       queryParams.push(params.name);
//     }

//     if (params.ids) {
//       // const serach_ids = params.ids.split(',').map(Number)
//       whereClauses.push('monster_id IN (?)');
//       queryParams.push(params.ids);
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
//     return rows as NewMonsterType[];
//   } catch (error) {
//     // エラーが発生した場合は、コンソールにログを出力し、空の配列を返す
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch monsters.');
//   }
// }

export async function getMonsters(params: getMonstersProps) {
  try {
    // Supabaseのクエリビルダーを開始
    let query = supabase.from('monsters').select('*');

    // パラメータに応じてクエリをチェーンで追加
    if (params.kind) {
      query = query.eq('status_romaji', params.kind);
    }

    if (params.rank) {
      query = query.eq('ranks', params.rank);
    }

    if (params.monster_id) {
      query = query.eq('monster_id', params.monster_id);
    }

    if (params.name) {
      query = query.eq('name', params.name);
    }

    if (params.ids) {
      query = query.in('monster_id', params.ids);
    }

    // 最終的なクエリを実行
    const { data, error } = await query;
    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch monsters.');
    }

    // 結果を型付けして返す
    return data as NewMonsterType[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch monsters.');
  }
}

// SELECT *
// FROM products
// ORDER BY product_id ASC
// LIMIT 10 OFFSET 10

// SELECT *
// FROM products
// ORDER BY product_id ASC
// LIMIT M OFFSET (N - 1) * M;
// N = 何ページ目か
// M = 1ページにつき何件取得するか
