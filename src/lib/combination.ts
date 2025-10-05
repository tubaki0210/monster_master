import { CombinationType } from '@/type';
import { supabase } from './supabase';

interface getCombinationProps {
  monster_id?: string;
  combination_id?: number[];
}

export async function getCombination(params: getCombinationProps) {
  try {
    let query = supabase.from('combinations').select('*');

    if (params.monster_id) {
      query = query.eq('monster_id', params.monster_id);
    }

    if (params.combination_id) {
      query = query.in('combination_id', params.combination_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch combinations.');
    }
    return data as CombinationType[];
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

export default getCombination;
