"use client"
import { useState } from "react";
import NavBar from "../components/navBar";
import { Input } from "@chakra-ui/react";
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
            <Input
                className="my-8 p-2 w-96 h-8 mx-auto flex"
                value={value}
                onChange={handleChange}
                placeholder='Input your game here'
                size='sm'
                fontFamily={`${vt323.variable} font-vt323`}
                textColor={"black"}
            />
            <div className="mx-5 w-2/3 mx-auto grid grid-cols-2 md:grid-cols-3 Lg:grid-cols-6 xl:grid-cols-8 gap-6">
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