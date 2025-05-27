import React, { useState } from 'react'
import { Close, Menu } from "@mui/icons-material"
import Link from 'next/link'

const Sideber = () => {
    const [menuflag, setMenuFlag] = useState<boolean>(true);
    const LinkList = [
        {
            name: "モンスター一覧",
            path: "/allmonster"
        },
        {
            name: "配合検索",
            path: "/monster_combination"
        },
        {
            name: "モンスターマスター",
            path: "/monster_master"
        }
    ]

    return (
        <div>
            <div className='absolute left-15 top-10 grid' onClick={() => setMenuFlag(false)}><Menu fontSize='large' /></div>
            <div className={`w-62.5 h-screen bg-gray-200 fixed transition-all duration-300  top-0 ${menuflag ? "-left-62.5" : "left-0"}`}>
                <div className='absolute top-3 right-2 grid' onClick={() => setMenuFlag(true)}><Close /></div>
                <ul className='mt-15'>
                    {LinkList.map((item, index) => (
                        <li key={index} className='mt-7 px-7 py-4'>
                            <Link href={item.path} className='w-full'>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sideber
