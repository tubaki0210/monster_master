import Link from 'next/link';
import React from 'react';

const kindData = [
  {
    path: 'slime',
    name: 'スライム系',
  },
  {
    path: 'doragon',
    name: 'ドラゴン系',
  },
  {
    path: 'akuma',
    name: '悪魔系',
  },
  {
    path: 'busitu',
    name: '物質系',
  },
  {
    path: 'zombi',
    name: 'ゾンビ系',
  },
  {
    path: 'maji',
    name: '魔獣系',
  },
  {
    path: 'sizen',
    name: '自然系',
  },
  {
    path: 'maou',
    name: '魔王系',
  },
];

const KindTable = () => {
  return (
    <table className="border border-collapse w-1/2">
      <thead>
        <tr>
          <th colSpan={2} className="border p-3">
            <div className="text-3xl">系統</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/slime`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              スライム系
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/doragon`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              ドラゴン系
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/akuma`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              悪魔系
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/busitu`}
              className=" underline text-blue-400 hover:text-blue-500"
            >
              物質系
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/zombi`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              ゾンビ系
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/maju`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              魔獣系
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/sizen`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              自然系
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/kind/maou`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              魔王系
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default KindTable;
