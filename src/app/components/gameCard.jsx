import Link from "next/link";
import Image from "next/image";
import {
    VT323,
} from 'next/font/google';

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-vt323',
});

const GameCard = ({ className, type, name, cover }) => {
    return (
        <a
            href={`/${type}/${name}`}
            className={`${className} flex flex-col items-center cursor-pointer hover:-translate-y-1 duration-150`}
        >
            <Image
                src={`https:${cover.replace("t_thumb", "t_cover_big")}`}
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto aspect-[197/270] border-white border-4"
            />
            <h1 className={`${vt323.variable} font-vt323 w-full text-center text-lg truncate ...`}>{name.replaceAll('-', ' ')}</h1>
        </a>
    )
}

export default GameCard;