import Image from "next/image";
import pipe from '../../../public/assets/images/pipe.png'; // default fallback image if you want it
import { VT323 } from 'next/font/google';

const vt323 = VT323({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-vt323',
});

const GameCard = ({ className, type, name, cover }) => {
    const hasCover = cover != null;

    return (
        <a
            href={`/${type}/${name}`}
            className={`${className} flex flex-col items-center cursor-pointer hover:-translate-y-1 duration-150`}
        >
            {hasCover ? (
                <Image
                    src={`https:${cover.replace("t_thumb", "t_cover_big")}`}
                    alt={name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto aspect-[197/270] border-white border-4"
                />
            ) : (
                <div className="w-full aspect-[197/270] border-white border-4 bg-white bg-opacity-5 flex items-center justify-center text-sm italic text-white">
                    no cover
                </div>
            )}
            <h1 className={`${vt323.variable} font-vt323 w-full text-center text-lg truncate ...`}>
                {name.replaceAll('-', ' ')}
            </h1>
        </a>
    );
};

export default GameCard;
