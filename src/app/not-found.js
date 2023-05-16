import Image from 'next/image';
import korok from '../../public/assets/gifs/korok.gif'
import {
    Press_Start_2P as PS2P,
} from 'next/font/google';

const ps2p = PS2P({
    subsets: ['latin'],
    weight: '400',
    // this will be the css variable
    variable: '--font-ps2p',
});

export default function Custom404() {
    return <div className="h-screen flex items-center justify-center gap-6">
        <div className={`${ps2p.variable} font-ps2p flex flex-col items-end justify-center gap-1.5 text-lg`}>
            <h1>Nothing here</h1>
            <h1>Go away</h1>
        </div>
        <Image className='mb-5' src={korok} width={86}/>
    </div>
}