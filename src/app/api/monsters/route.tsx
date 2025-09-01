// import { db } from "@/lib/db";
import { getMonsters } from "@/lib/monster";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
    const params: {
    kind?: string;
    rank?: string;
    monster_id?: string;
    name?: string;
    ids?: number[];
  } = {};
  const ids = url.searchParams.get("ids");
  if (ids) {
    params.ids = ids.split(",").map(Number);
  }

  const monster_id = url.searchParams.get("monster_id");
  if (monster_id) {
    params.monster_id = monster_id;
  }

  const name = url.searchParams.get("name");
  if (name) {
    params.name = name;
  }

  const status = url.searchParams.get("kind"); // 既存のコードでは 'status'、getMonstersでは 'kind'
  if (status) {
    params.kind = status; // ここでgetMonstersの'kind'にマッピング
  }

  const rank = url.searchParams.get("rank");
  if (rank) {
    params.rank = rank;
  }
  try {
    const rows = await getMonsters(params);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
