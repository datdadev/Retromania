"use client"
import { useEffect, useState } from "react";
import { decode } from 'html-entities';
import Image from "next/image";
import loadingGif from '../../../public/assets/gifs/loading.gif'
import {
    VT323,
} from 'next/font/google';
import NavBar from "./navBar";
import GameCard from "./gameCard";

import platforms from "../../../public/assets/jsons/platforms.json"

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const CONSOLE = ({ _type, _fileType }) => {
    const type = _type;
    const fileType = _fileType;

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => setValue(event.target.value)

    const [gameList, setGameList] = useState([]);
    const [matchedGames, setMatchedGames] = useState([]);

    useEffect(() => {
        async function getGames() {
            setLoading(true);
            let responseFromHost = await fetch(`${process.env.NEXT_PUBLIC_ROMS_URL}${type}`)
            const backendHtmlString = await responseFromHost.text()
            if (!backendHtmlString.includes('<a')) {
                return []; // or any other default value you want to use
            }
            const decodedHtmlString = decode(backendHtmlString);
            const regex = new RegExp(`(?<=>)[\\w.'!:-]+(?=.${fileType}<)`, 'g');
            let gameNames = [];
            if (typeof decodedHtmlString === 'string') {
                gameNames = [...decodedHtmlString.match(regex)];
            }

            // Split gameNames array into smaller chunks
            const chunkSize = 10;
            const chunks = [];
            for (let i = 0; i < gameNames.length; i += chunkSize) {
                chunks.push(gameNames.slice(i, i + chunkSize));
            }

            let gamesDetail = [];
            for (let i = 0; i < chunks.length; i++) {
                const responseFromDatabase = await fetch(
                    `${process.env.NEXT_PUBLIC_CORS_URL}api.igdb.com/v4/games`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                    },
                    body: `fields name, cover.url;
                  where name = "${(chunks[i].map(str => str.replaceAll(/-/g, " "))).join('" & platforms.name = "' + platforms[type].name + '" | name = "')}" & platforms.name = "${platforms[type].name}";`
                }
                );

                const responseJson = await responseFromDatabase.json();
                gamesDetail = [...gamesDetail, ...responseJson];
            }
            setLoading(false);
            return gamesDetail;
        }

        getGames().then((array) => setGameList(array));
    }, []);


    useEffect(() => {
        setMatchedGames(
            gameList.filter((game) =>
                game.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    }, [gameList, value]);

    return (
        <>
            <NavBar currentPage={type} />
            <div className={`${vt323.variable} font-vt323 text-2xl py-7 w-96 mx-auto flex justify-center gap-4`}>
                <form className="flex gap-3" action="/send-data-here" method="post">
                    <label for="username">Search:</label>
                    <input onChange={handleChange} className="px-1 w-full text-black" type="text" id="first" name="first" />
                </form>
                <span>{matchedGames.length}/{gameList.length}</span>
            </div>
            {loading ? (
                <div className="flex justify-center">
                    <Image src={loadingGif} width={64} height={64} />
                </div>
            ) : (
                <div className="mx-5 w-2/3 mx-auto grid grid-cols-2 md:grid-cols-3 Lg:grid-cols-5 xl:grid-cols-8 gap-6">
                    {gameList?.map((game) => {
                        if (game.name.toLowerCase().includes(value.toLowerCase()))
                            return (
                                <GameCard
                                    type={type}
                                    name={game.name.replaceAll(" ", "-")}
                                    cover={game?.cover?.url}
                                />
                            );
                    })}
                </div>
            )}
        </>
    );

}

export default CONSOLE;