"use client"
const type = "nes";

import { useEffect, useState } from "react";
import { decode } from 'html-entities';
import NavBar from "../components/navBar";
import {
    VT323,
} from 'next/font/google';
import GameCard from "../components/gameCard";

import platforms from "../../../public/assets/jsons/platforms.json"

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const NES = () => {
    const [value, setValue] = useState('')
    const handleChange = (event) => setValue(event.target.value)

    const [gameList, setGameList] = useState([]);
    useEffect(() => {
        async function getGames() {
            let responseFromHost = await fetch(`https://zlink.ddns.net/roms/${type}`)
            const backendHtmlString = await responseFromHost.text()
            if (!backendHtmlString.includes('<a')) {
                return []; // or any other default value you want to use
            }
            const decodedHtmlString = decode(backendHtmlString);
            const regex = new RegExp(`(?<=>)[\\w.':-]+(?=.${type}<)`, 'g');
            let gameNames = [];
            if (typeof decodedHtmlString === 'string') {
                gameNames = [...decodedHtmlString.match(regex)];
            }

            let responseFromDatabase = await fetch(`https://zlink.ddns.net/cors/api.igdb.com/v4/games`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                },
                body: `fields name, cover.url;
                where name = "${(gameNames.map(str => str.replaceAll(/-/g, " "))).join('" & platforms.name = "' + platforms[type] + '" | name = "')}" & platforms.name = "${platforms[type]}";`
            });
            let gamesDetail = await responseFromDatabase.json();
            console.log(gamesDetail)
            return gamesDetail
        }
        getGames().then((array) => setGameList(array))
    }, []);

    return (
        <>
            <NavBar currentPage={type} />
            <div className={`${vt323.variable} font-vt323 py-7 w-96 mx-auto flex flex-col justify-center text-2xl`}>
                <form className="flex gap-3" action="/send-data-here" method="post">
                    <label for="username">Search:</label>
                    <input onChange={handleChange} className="px-1 w-full text-black" type="text" id="first" name="first" />
                </form>
            </div>
            <div className="mx-5 w-2/3 mx-auto grid grid-cols-2 md:grid-cols-3 Lg:grid-cols-5 xl:grid-cols-8 gap-6">
                {
                    gameList?.map((game) => {
                        if (game.name.toLowerCase().includes(value.toLowerCase()))
                            return <GameCard
                                type={type}
                                name={game.name}
                                cover={game.cover.url}
                            />
                    })
                }
            </div>
        </>
    )
}

export default NES;