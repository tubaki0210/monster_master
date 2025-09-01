import Link from 'next/link';
import React from 'react';

const RankTable = () => {
  return (
    <table className="border border-collapse mt-10 w-1/2">
      <thead>
        <tr>
          <th colSpan={2} className="border p-3 text-3xl">
            ランク
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/G`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Gランク
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/F`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Fランク
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/E`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Eランク
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/D`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Dランク
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/C`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Cランク
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/B`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Bランク
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/A`}
              className="underline text-blue-400 *:hover:text-blue-500"
            >
              Aランク
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/S`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Sランク
            </Link>
          </td>
        </tr>
        <tr>
          <td className="border  py-4 text-2xl text-center">
            <Link
              href={`/allmonster/rank/X`}
              className="underline text-blue-400 hover:text-blue-500"
            >
              Xランク
            </Link>
          </td>
          <td className="border  py-4 text-2xl text-center"></td>
        </tr>
      </tbody>
    </table>
  );
};

export default RankTable;
