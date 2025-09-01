import getCombination from "@/lib/combination";

export async function GET(req: Request) {
  const params : {
    monster_id? : string;
    combination_id? : number[]
  } = {};
  const { searchParams } = new URL(req.url);
  const combination_id = searchParams.get("combination_id");
  if (combination_id) {
    params.combination_id = combination_id.split(",").map(Number)
  }
  const monster_id = searchParams.get("monster_id") 
  if (monster_id) {
    params.monster_id = monster_id
  }
  try {
    const rows = await getCombination(params)
    return Response.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
