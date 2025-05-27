import { db } from "@/lib/db"; 

async function getByName(name1 : string, name2 : string) {
  const [name_rows] = await db.query("SELECT c1.combination_id FROM combination_parent c1 JOIN combination_parent c2 ON c1.combination_id = c2.combination_id WHERE c1.parent = ? AND c2.parent = ?",[name1,name2]);
  return name_rows
}

async function getByStatus(status1 : string, status2 : string) {
  const [status_rows] = await db.query("SELECT c1.combination_id FROM combination_parent c1 JOIN combination_parent c2 ON c1.combination_id = c2.combination_id WHERE c1.parent = ? AND c2.parent = ?",[status1,status2]);
  return status_rows
}

async function getByIds(ids:Number[]) {
  const [rows] = await db.query("SELECT * FROM combination_parent WHERE combination_id IN (?) ", [ids])
  return rows
}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url)
    const combination_ids = searchParams.get('combination_id');
    const name1 = searchParams.get('name1');
    const status1 = searchParams.get('status1')
    const name2 = searchParams.get('name2');
    const status2 = searchParams.get('status2')
    const search_ids = combination_ids?.split(',').map(Number)
    try {
      let rows;
      if (search_ids) {
        rows = await getByIds(search_ids)
      } else if (name1 && name2 && status1 && status2){
        const name_rows = await getByName(name1, name2)
        const status_rows = await getByStatus(status1,status2)
        return Response.json({name_rows,status_rows});
      }
      return Response.json(rows)
      // const [all_rows] = await db.query('SELECT * FROM combination_parent');
    } catch (err) {
      console.error('DB Error:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }