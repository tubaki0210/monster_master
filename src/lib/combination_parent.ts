import { CombinationParentType } from "@/type";
import { db } from "./db";

interface getCombinationParentProps {
  combination_id?: number[];
  name?:string;
}

export async function getCombinationParent(params : getCombinationParentProps) {

      try {
        // 基本となるクエリ
        let query = 'SELECT * FROM combination_parent';
        
        // WHERE句の条件と、それに渡すパラメータを格納する配列
        const whereClauses = [];
        const queryParams = [];    
        if (params.combination_id && params.combination_id.length > 0) {
            whereClauses.push('combination_id IN (?)')
            queryParams.push(params.combination_id)
        }
        
        if (params.name) {
          whereClauses.push('parent = ?')
          queryParams.push(params.name)
        }
        // WHERE句の条件が1つ以上あれば、クエリ文字列に結合
        if (whereClauses.length > 0) {
          query += ' WHERE ' + whereClauses.join(' AND ');
        }
        
        // データベースにクエリを発行
        const [rows] = await db.query(query, queryParams);
        // console.log(rows)
        // 結果を型付けして返す
        // const result = rows
        // return rows as NewMonsterType[]
        return rows as CombinationParentType[]
    
      } catch (error) {
        // エラーが発生した場合は、コンソールにログを出力し、空の配列を返す
        console.error("Database Error:", error);
        // または throw new Error('Failed to fetch monsters.'); のようにエラーをスローする
        return [];
      }
}
export default getCombinationParent