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
            try {
                // === GET GAMES ===
                const responseFromHost = await fetch(`${process.env.NEXT_PUBLIC_ROMS_URL}${type}`);
                const backendHtmlString = await responseFromHost.text();
                if (!backendHtmlString.includes('<a')) return [];

                const decodedHtmlString = decode(backendHtmlString);
                const regex = new RegExp(`(?<=>)[\\w.'!:-]+(?=.${fileType}<)`, 'g');
                let gameNames = decodedHtmlString.match(regex) || [];

                // === GET COVERS ===
                const chunkSize = 10;
                const chunks = [];
                for (let i = 0; i < gameNames.length; i += chunkSize) {
                    chunks.push(gameNames.slice(i, i + chunkSize));
                }

                let gamesDetail = [];
                for (const chunk of chunks) {
                    const query = `fields name, cover.url;
                        where name = "${chunk.map(n => n.replaceAll(/-/g, " ")).join(`" & platforms.name = "${platforms[type].name}" | name = "`)}" & platforms.name = "${platforms[type].name}";`;

                    const response = await fetch(`${process.env.NEXT_PUBLIC_CORS_URL}api.igdb.com/v4/games`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Client-ID': process.env.NEXT_PUBLIC_CLIENT_ID,
                            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        body: query,
                    });

                    if (!response.ok) {
                        console.error("Failed to fetch IGDB games:", await response.text());
                        continue; // skip this chunk
                    }

                    const responseJson = await response.json();
                    gamesDetail.push(...responseJson);
                }

                // === MERGE RAW GAME LIST WITH IGDB DETAIL ===
                const merged = gameNames.map(name => {
                    const match = gamesDetail.find(g => g.name.toLowerCase() === name.toLowerCase());
                    return {
                        name,
                        cover: match?.cover || null,
                    };
                });

                return merged;
            } catch (error) {
                console.error("Error in getGames:", error);
                return []; // Fallback to empty list on error
            } finally {
                setLoading(false); // Always turn off loading state
            }
        }

        getGames().then((games) => setGameList(games));
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
                                    cover={game?.cover?.url || null}
                                />
                            );
                    })}
                </div>
            )}
        </>
    );

}

export default CONSOLE;