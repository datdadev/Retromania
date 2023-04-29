import NavBar from "@/app/components/navBar"
import Player from "@/app/components/player";
import {
    Press_Start_2P as PS2P,
    VT323,
} from 'next/font/google';

import gameList from "../../api/gameList.json"

const ps2p = PS2P({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-ps2p',
});

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const NesPlayer = ({ params } = {
    params: { id: string }
}) => {
    const matchingGame = gameList.filter((game) => game.title === params.id.replaceAll('-', ' '))[0];
    return (
        <>
            <NavBar currentPage="nes" />
            <h1 className={`${ps2p.variable} font-ps2p py-5 text-center text-2xl`}>{params.id.replaceAll('-', ' ')}</h1>
            <div className='aspect-[4/3] h-[calc(100vh-68*3px)] mx-auto border-white border-4'>
                <Player
                    gameUrl={matchingGame.gameUrl}
                />
            </div>
        </>
    )
}

export default NesPlayer