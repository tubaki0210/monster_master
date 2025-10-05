export interface MonsterType {
  monster_id: number;
  name: string;
  ranks: string;
  status: string;
  scout: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  egg: string;
  other: string;
}

export interface NewMonsterType {
  monster_id: number;
  name: string;
  ranks: string;
  status: string;
  status_romaji: string;
  scout: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  egg: string;
  other: string;
  parent1?: string;
  parent2?: string;
}

export interface useGetMonsterType {
  monster: NewMonsterType[] | undefined;
  monstererror?: string;
}

export interface useGetMonsterTypeP {
  parent: NewMonsterType[] | undefined;
  parent_error?: string;
}

export interface CombinationType {
  combination_id: number;
  monster_id: number;
  information: string;
  special_flag: number;
}

export interface useCombinationType {
  combination: CombinationType[] | undefined;
  combinationerror?: string;
}

export interface useCombinationTypeP {
  combination_parent: CombinationType[] | undefined;
  comb_parent_error?: string;
}

export interface CombinationParentType {
  combination_parent_id?: number;
  combination_id: number;
  monster_id: number;
  parent: string;
}

export interface useCombinationParentTypeByName {
  children: CombinationParentType[] | undefined;
  children_error?: string;
}

export interface IdParent {
  monster_id: number;
  parent: string;
}

export interface CombinationList {
  combination_id: number;
  information: string;
  monster_id: number;
  topparent: IdParent[];
  special_flag: number;
}

export interface CombinationAndParentType {
  combination_id: number;
  monster_id: number;
  information: string;
  special_flag: number;
  combination_parent: IdParent[];
}

export interface useCombinationParentTypeById {
  combination_children: CombinationList[] | undefined;
  comb_children_error?: string;
}
