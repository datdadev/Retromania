import platforms from "../../../../public/assets/jsons/platforms.json"
const consoles = Object.keys(platforms);

import ErrorPage from '../../not-found.js';
import NavBar from "../../components/navBar.jsx"
import Player from "../../components/player.jsx";
import {
    Press_Start_2P as PS2P,
    VT323,
} from 'next/font/google';

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

const GAME = ({ params }) => {
    const { console, game } = params;

    // Check if the console value is in the desired consoles list
    const isValidConsole = consoles.includes(console);

    if (!isValidConsole) {
        // Render the 404 page if the console is not valid
        return <ErrorPage />;
    }

    return (
        <>
            <NavBar currentPage={console} />
            <h1 className={`${ps2p.variable} font-ps2p py-5 text-center text-2xl`}>{game.replaceAll('-', ' ').replaceAll('%3A',':')}</h1>
            <div className='aspect-[4/3] h-[calc(100vh-68*3px)] mx-auto border-white border-4'>
                <Player
                    type={console}
                    gameUrl={`${process.env.NEXT_PUBLIC_ROMS_URL}${console}/${game.replace("'", "\\'")}.${console === "snes" ? "sfc" : console}`}
                />
            </div>
        </>
    )
}

export default GAME