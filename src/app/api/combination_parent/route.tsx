import getCombinationParent from "@/lib/combination_parent";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const params : {
    combinaiton_id? : number[];
    name? : string;
  } = {}
  const combination_ids = searchParams.get("combination_id");
  if (combination_ids) {
    params.combinaiton_id = (combination_ids.split(",").map(Number))
  }
  const name = searchParams.get("name");
  if (name) {
    params.name = name;
  }

  try {
    const rows = await getCombinationParent(params)
    return Response.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
