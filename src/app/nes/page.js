"use client"
import { useState } from "react";
import NavBar from "../components/navBar";
import {
    VT323,
} from 'next/font/google';
import GameCard from "../components/gameCard";

import gameList from "../api/gameList.json";

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const Nes = () => {
    const [value, setValue] = useState('')
    const handleChange = (event) => setValue(event.target.value)
    return (
        <>
            <NavBar currentPage="nes" />
            <div className={`${vt323.variable} font-vt323 py-7 w-96 mx-auto flex flex-col justify-center text-2xl`}>
                <form className="flex gap-3" action="/send-data-here" method="post">
                    <label for="username">Search:</label>
                    <input onChange={handleChange} className="px-1 w-full text-black" type="text" id="first" name="first" />
                </form>
            </div>
            <div className="mx-5 w-2/3 mx-auto grid grid-cols-2 md:grid-cols-3 Lg:grid-cols-5 xl:grid-cols-8 gap-6">
                {
                    gameList.map((game) => {
                        if (game.title.toLowerCase().includes(value.toLowerCase()))
                            return <GameCard
                                title={game.title}
                                image={game.imageUrl}
                                gamUrl={game.gameUrl}
                            />
                    })
                }
            </div>
        </>
    )
}

export default Nes;