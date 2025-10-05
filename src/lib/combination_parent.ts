import { CombinationAndParentType, CombinationParentType } from '@/type';
import { supabase } from './supabase';

interface getCombinationParentProps {
  combination_id?: number[];
  name?: string;
}

export async function getCombinationParent(params: getCombinationParentProps) {
  try {
    let query = supabase.from('combination_parent').select('*');

    if (params.combination_id && params.combination_id.length > 0) {
      query = query.in('combination_id', params.combination_id);
    }

    if (params.name) {
      query = query.eq('parent', params.name);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch combination parents.');
    }

    return data as CombinationParentType[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

interface getCombinationAndParentsProps {
  monster_id: string;
}

export async function getCombinationAndParents(
  params: getCombinationAndParentsProps
) {
  try {
    const { data, error } = await supabase
      .from('combinations')
      .select(
        `
        *,
        combination_parent(
          monster_id,
          parent
        )
      `
      )
      .eq('monster_id', params.monster_id);

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch combination and parents.');
    }

    // 取得したデータをそのまま返す
    return data as CombinationAndParentType[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default getCombinationParent;
