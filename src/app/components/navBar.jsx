"use client"
import {
    Press_Start_2P as PS2P,
} from 'next/font/google';
import Link from 'next/link';

const ps2p = PS2P({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-ps2p',
});

const NavBar = ({ currentPage = "" }) => {
    return <div className='px-5 py-5 h-[68px] bg-white/10 flex items-center justify-between border-b-2'>
        <h1 className={`${ps2p.variable} font-ps2p text-xl`}>RETROMANIA</h1>
        <div className='flex gap-5 items-center'>
            {
                ["", "nes", "snes", "N64"].map((route) => {
                    return <Link href={`/${route}`} className={`${ps2p.variable} font-ps2p ${currentPage === route ? "text-white" : "text-white/50 hover:text-white duration-150"}`}>{route ? route.toUpperCase() : "HOME"}</Link>
                })
            }
        </div>
    </div>
}

export default NavBar;