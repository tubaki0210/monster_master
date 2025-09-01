# ドラゴンクエストモンスターズ３ 配合検索アプリ

## 概要

- 任天堂 Switch と Steam にある「ドラゴンクエストモンスターズ３ 魔族の王子とエルフの旅」というゲームの配合検索アプリ

- モンスターの一覧を確認できる(ランクごと、系統ごとも可)

- モンスター名を入力して検索することも可能

- 配合検索では作りたいモンスター名を入力することで、そのモンスターを配合するのに必要なモンスターを確認できる。

- 入力したモンスターを利用して新たに作ることができるモンスターも確認できる

## デモ動画

https://github.com/user-attachments/assets/a6ebcc14-f419-4935-8e07-141c2a14d501

## 使用技術

- Next.js
- TypeScript
- TailwindCSS
- MySQL

## データベース設計

```mermaid
erDiagram
    monsters {
        number monster_id pk "NOT NULL"
        string name "NOT NULL"
        string ranks "NOT NULL"
        string status "NOT NULL"
        string scout "NOT NULL"
        string hiragana "NOT NULL"
        number katakana "NOT NULL"
        string romaji "NOT NULL"
        string status_romaji "NOT NULL"
        string egg
        string other
    }

    combinations {
        number combination_id pk "NOT NULL"
        number monster_id fk "NOT NULL"
        string information
        boolean special_flag "NOT NULL"
    }



    combination_parent {
        number combination_parent_id fk "NOT NULL"
        number combination_id fk "NOT NULL"
        number monster_id fk "NOT NULL"
        string parent "NOT NULL"
    }

    monsters ||--|{ combinations : "has"
    combinations ||--|{ combination_parent : "details"
    monsters ||--|{ combination_parent : "is_parent_of"
```
