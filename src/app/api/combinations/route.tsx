import { db } from "@/lib/db"; 

async function getCombinationById(ids:number[]) {
    const [rows] = await db.query('SELECT * FROM combinations WHERE combination_id IN (?)',[ids]);
    return rows
}

async function getCombinationByMonsterId(id : Number) {
    const [rows] = await db.query('SELECT * FROM combinations WHERE monster_id = ?',[id]);
    return rows
}

export async function GET(req : any) {
    const { searchParams } = new URL(req.url)
    const combination_id = searchParams.get('combination_id');
    const monster_id = searchParams.get('monster_id');
    const serach_ids = combination_id?.split(',').map(Number)
    console.log(monster_id,serach_ids)
    try {
      let rows;
      if (serach_ids) {
        console.log(true)
        rows = await getCombinationById(serach_ids)
      } else if(monster_id) {
        rows = await getCombinationByMonsterId(Number(monster_id))
      }
      console.log(rows)
      return Response.json(rows);
    } catch (err) {
      console.error('DB Error:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }