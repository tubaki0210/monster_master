import { NewMonsterType } from '@/type';
import { supabase } from './supabase';

interface getMonstersProps {
  kind?: string;
  rank?: string;
  monster_id?: string;
  name?: string;
  ids?: number[];
}

export async function getMonsters(params: getMonstersProps) {
  try {
    let query = supabase.from('monsters').select('*');

    if (params.kind) {
      query = query.eq('status_romaji', params.kind);
    }

    if (params.rank) {
      query = query.eq('ranks', params.rank);
    }

    if (params.monster_id) {
      query = query.eq('monster_id', params.monster_id);
    }

    if (params.name) {
      query = query.eq('name', params.name);
    }

    if (params.ids) {
      query = query.in('monster_id', params.ids);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Supabase Error:', error);
      throw new Error('Failed to fetch monsters.');
    }

    return data as NewMonsterType[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch monsters.');
  }
}
