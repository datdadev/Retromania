import Image from 'next/image';
import {
VT323,
} from 'next/font/google';
import Link from 'next/link';

const vt323 = VT323({
subsets: ['latin'],
weight: '400',
// this will be the css variable
variable: '--font-vt323',
});

const ConsoleCard = ({ image, gif, name, numberOfGames }) => {
    return (
        <a href={`/${name.toLowerCase()}`} className='px-4 py-2 group cursor-pointer border-4 border-black hover:border-white flex flex-col items-center'>
            <div className='relative w-[130px] h-[100px] xl:w-[220px] xl:h-[170px]'>
                <Image className='absolute inset-y-0 opacity-100 group-hover:opacity-0 duration-150' src={image} />
                <Image className='absolute opacity-0 group-hover:opacity-100 duration-150' src={gif} />
            </div>
            <h2 className={`${vt323.variable} font-vt323 text-2xl xl:text-3xl`}>{name}</h2>
            <p className={`${vt323.variable} font-vt323 -mt-3 text-xl xl:text-2xl text-white/50`}>{numberOfGames} games</p>
        </a>
    )
}

export default ConsoleCard