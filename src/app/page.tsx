import Link from 'next/link';
export default function Home() {
  return (
    <div className="font-serif h-screen flex justify-between container items-center mx-auto font-bold p-10">
      <Link
        href="/allmonster"
        className="bg-amber-200 w-70 h-60 rounded-3xl text-3xl shadow-2xl"
      >
        <div className="flex items-center justify-center h-full">
          <div>モンスター情報</div>
        </div>
      </Link>
      <Link
        className="bg-amber-200 w-70 h-60 rounded-3xl text-3xl shadow-2xl"
        href="/monster_combination"
      >
        <div className="flex items-center justify-center h-full">配合検索</div>
      </Link>
      {/* <Link className="bg-amber-200 w-70 h-60 rounded-3xl text-3xl shadow-2xl" href='/monster_master'>
        <div className="flex items-center justify-center h-full text-center">
          モンスターマスター
        </div>
      </Link> */}
    </div>
  );
}
