import { db } from "@/lib/db"; 

async function getAllMonsters() {
  const [rows] = await db.query('SELECT * FROM monsters');
  return rows
}

async function getMonster( search_ids : number[]) {
  const [rows] = await db.query('SELECT * FROM monsters WHERE monster_id IN (?)',[search_ids]);
  return rows
}

async function getMonsterById(monster_id : string) {
  const [rows] = await db.query('SELECT * FROM monsters WHERE monster_id = ?', [monster_id])
  return rows
}

async function getMonsterByName(name : string) {
  const [rows] = await db.query('SELECT * FROM monsters WHERE name = ?', [name])
  return rows
}

async function getMonsterByStauts(status : string) {
  const [rows] = await db.query('SELECT * FROM monsters WHERE status = ?', [status])
  return rows
}

async function getMonsterByRank(rank : string) {
  const [rows] = await db.query('SELECT * FROM monsters WHERE ranks = ?', [rank])
  return rows
}

export async function GET(req:any) {
    const url = new URL(req.url);
    const ids = url.searchParams.get("ids");
    const serach_ids = ids?.split(',').map(Number)
    const monster_id = url.searchParams.get('monster_id')
    const name = url.searchParams.get("name");
    const status = url.searchParams.get("status");
    const rank = url.searchParams.get("rank");
    try {
      let rows;
      if (serach_ids) {
        rows = await getMonster(serach_ids)
      } else if (monster_id) {
        rows = await getMonsterById(monster_id);
      } else if(name) {
        rows = await getMonsterByName(name)
      } else if (status) {
        rows = await getMonsterByStauts(status)
      } else if (rank) {
        rows = await getMonsterByRank(rank)
      } else {
        rows = await getAllMonsters()
      }
      // console.log(rows)
      return Response.json(rows);
    } catch (err) {
      console.error('DB Error:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }