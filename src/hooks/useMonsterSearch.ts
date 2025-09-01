// 例: useMonsterSearch.js (カスタムフック)
import { useMemo } from 'react';
import { toKana, toHankaku } from '@/lib/change_text';
import { NewMonsterType } from '@/type';

interface Props {
  text: string;
  monsters: NewMonsterType[];
}

export const useMonsterSearch = ({ text, monsters }: Props) => {
  const filteredMonsters = useMemo(() => {
    if (!monsters || text === '') {
      return [];
    }
    return monsters.filter(
      (item) =>
        item.name.includes(text) ||
        item.katakana.includes(toKana(text)) ||
        item.romaji.includes(toHankaku(text))
    );
  }, [text, monsters]);

  return filteredMonsters;
};
// mutate(data, 再取得するか)
// 新しいdataでUIを先に更新する（データ更新が成功すると仮定している）。バックでデータ更新などが行われている。
