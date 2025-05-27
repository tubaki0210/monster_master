export interface MonsterType {
    monster_id : number
    name : string,
    ranks : string,
    status : string,
    scout : string,
    hiragana : string,
    katakana : string,
    romaji : string,
    egg : string,
    other : string,

}

export interface NewMonsterType {
    monster_id : number
    name : string,
    ranks : string,
    status : string,
    scout : string,
    hiragana : string,
    katakana : string,
    romaji : string,
    egg : string,
    other : string,
    parent1? : string,
    parent2? : string
}

export interface CombinationType {
    combination_id : number,
    monster_id : number,
    information : string,
    special_flag : number
}

export interface CombinationParentType {
    combination_parent_id : number,
    combination_id : number,
    monster_id : number,
    parent : string
}

export interface IdParent {
    monster_id : number,
    parent : string
}

export interface CombinationList {
    combination_id : number,
    information : string,
    monster_id : number,
    topparent : IdParent[],
    special_flag : number
}