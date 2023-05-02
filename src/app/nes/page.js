"use client"
import { useEffect, useState } from "react";
import { decode } from 'html-entities';
import NavBar from "../components/navBar";
import {
    VT323,
} from 'next/font/google';
import GameCard from "../components/gameCard";

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const Nes = () => {
    const [value, setValue] = useState('')
    const handleChange = (event) => setValue(event.target.value)

    const [gameList, setGameList] = useState([]);
    useEffect(() => {
        async function getGames() {
            let responseFromHost = await fetch(`https://zlink.ddns.net/roms/nes`)
            const backendHtmlString = await responseFromHost.text()
            if (!backendHtmlString.includes('<a')) {
                return []; // or any other default value you want to use
            }
            const gameNames = [...decode(backendHtmlString).match(/(?<=>)[\w.\':-]+(?=.nes<)/g)];

            let responseFromDatabase = await fetch(`https://api.igdb.com/v4/games`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': process.env.CLIENT_ID,
                    'Authorization': `Bearer ${[process.env.ACCESS_TOKEN]}`,
                },
                body: `fields name, cover.url;
where name = "${(gameNames.map(str => str.replaceAll(/-/g, " "))).join('","')}" & cover.url != null;`
            });
            let raw_gamesDetail = await responseFromDatabase.json();
            const gamesDetail = raw_gamesDetail.reduce((accumulator, currentGame) => {
                // Check if the game's name already exists in the accumulator array
                const existingGame = accumulator.find(game => game.name === currentGame.name);
                if (existingGame) {
                    // If the game already exists, update its cover URL if it's missing
                    if (!existingGame.cover && currentGame.cover) {
                        existingGame.cover = currentGame.cover;
                    }
                } else {
                    // If the game doesn't exist yet, add it to the accumulator array
                    accumulator.push(currentGame);
                }
                return accumulator;
            }, []);

            gamesDetail.map(game => {
                return {
                    name: game.name,
                    cover: game.cover.url
                };
            });
            return gamesDetail
        }
        getGames().then((array) => setGameList(array))
    }, []);

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
                    gameList?.map((game) => {
                        if (game.toLowerCase().includes(value.toLowerCase()))
                            return <GameCard
                                type="nes"
                                name={game.name}
                                cover={game.cover}
                            />
                    })
                }
            </div>
        </>
    )
}

export default Nes;