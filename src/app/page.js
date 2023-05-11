'use client'
import Link from 'next/link';
import { decode } from 'html-entities';
import Script from 'next/script';
import Image from 'next/image'
import {
  Press_Start_2P as PS2P,
  VT323,
} from 'next/font/google';
import { IoCaretDownSharp } from "react-icons/io5"
import { SiFirefoxbrowser, SiGooglechrome, SiOpera, SiBrave } from "react-icons/si"
import { FaSafari } from "react-icons/fa"

import platforms from '../../public/assets/jsons/platforms.json'
import Player from './components/player';
import NavBar from './components/navBar';
import pipe from "../../public/assets/images/pipe.png";
import oneUp from "../../public/assets/images/1up.png";
import triforce from "../../public/assets/images/triforce.png";
import nes from "../../public/assets/images/nes.png";
import snes from "../../public/assets/images/snes.png";
import gba from "../../public/assets/images/gba.png";
import n64 from "../../public/assets/images/n64.png";
import nds from "../../public/assets/images/nds.png";
import nesGif from "../../public/assets/gifs/nes.gif";
import snesGif from "../../public/assets/gifs/snes.gif";
import gbaGif from "../../public/assets/gifs/gba.gif";
import n64Gif from "../../public/assets/gifs/n64.gif";
import ndsGif from "../../public/assets/gifs/nds.gif";
import metroidBackground from "../../public/assets/images/metroidBackground.png";
import samusShip from "../../public/assets/gifs/samusShip.gif";

import { useEffect, useRef, useState } from 'react';
import ConsoleCard from './components/consoleCard';
import StyledTextCard from './components/styledTextCard';

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

export default function Home() {
  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const scroll2Page1 = () => page1Ref.current.scrollIntoView({ behavior: 'smooth' });
  const scroll2Page2 = () => page2Ref.current.scrollIntoView({ behavior: 'smooth' });

  const initialNumberOfGames = Object.keys(platforms).reduce((gameList, key) => {
    gameList[key] = "...";
    return gameList;
  }, {});
  const [numberOfGames, setNumberOfGames] = useState(initialNumberOfGames);
  useEffect(() => {
    async function getGames(url) {
      let response = await fetch(url)
      const backendHtmlString = await response.text()
      if (!backendHtmlString.includes('<a')) {
        return 0; // or any other default value you want to use
      }
      const array = [...decode(backendHtmlString).match(/<a/g)];
      return array.length;
    }

    const urls = Object.keys(platforms).map(key => `${process.env.NEXT_PUBLIC_ROMS_URL}${key}`);
    Promise.all(urls.map(url => getGames(url)))
      .then(counts => {
        const updatedGameList = Object.keys(platforms).reduce((gameList, key, index) => {
          gameList[key] = counts[index];
          return gameList;
        }, {});
        setNumberOfGames(updatedGameList);
      });
  }, []);

  return (
    <>
      <main className="bg-black min-h-screen relative">
        <NavBar />

        <div className='my-container'>
          <section className='relative'>
            <div className='p-12 Lg:px-16 xl:px-36 mx-auto flex flex-col-reverse Lg:flex-row gap-5 Lg:gap-12 items-center'>
              <div className='relative basis-1/2 aspect-[4/3] border-white border-4'>
                <Player />
                <Link href={"https://www.youtube.com/watch?v=xvFZjo5PgG0"} target='_blank' className={`${ps2p.variable} font-ps2p underline`}>
                  <Image
                    data-speed="-2"
                    className='layer absolute collapse Lg:visible -left-20 -bottom-28 hover:-bottom-32 duration-150'
                    src={pipe}
                    alt=''
                    width={128}
                    height={0}
                  />
                </Link>
              </div>
              <div className='basis-1/2'>
                <div className='pb-1 md:pb-4 flex justify-center Lg:justify-start items-center'>
                  <div className='flex flex-col'>
                    <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-4xl`}>RETROMANIA</h1>
                    <h2 className={`${ps2p.variable} font-ps2p text-md Lg:text-xl text-white/50`}>Best retro site</h2>
                  </div>
                  <Image
                    className='ml-5'
                    alt=""
                    src="https://art.pixilart.com/eed75aa54e6c6f6.png"
                    width={84}
                    height={84}
                  />
                </div>
                <p className={`${vt323.variable} font-vt323 mx-0 md:mx-32 Lg:mx-0 text-lg md:text-2xl Lg:text-3xl`}>Retromania is a website that features a vast collection of classic retro games from the 80s and 90s, including games from consoles such as Nintendo, Atari, Sega, and more. It offers a nostalgic trip down memory lane for fans of the genre and is the ultimate destination for gamers seeking to relive the golden age of gaming.</p>
              </div>
            </div>
            <div className='absolute bottom-1.5 inset-x-0 w-full'>
              <IoCaretDownSharp
                className='animate-bounce mx-auto duration-300' size={28}
                onClick={scroll2Page1}
              /></div>
          </section>

          <section ref={page1Ref} className='relative py-16'>
            <div className='w-full flex flex-col justify-between'>
              <div className='h-full flex'>
                <div className='basis-1/2 flex flex-col'>
                  <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-3xl text-center`}>Available</h1>
                  <div className='mt-3 h-full flex flex-col gap-4 justify-center items-center'>
                    <div className='flex gap-4 Lg:gap-8 items-center'>
                      <ConsoleCard image={nes} gif={nesGif} name={"NES"} numberOfGames={numberOfGames["nes"]} />
                      <ConsoleCard image={snes} gif={snesGif} name={"SNES"} numberOfGames={numberOfGames["snes"]} />
                      <ConsoleCard image={gba} gif={gbaGif} name={"GBA"} numberOfGames={numberOfGames["gba"]} />
                    </div>
                    <div className='flex gap-4 Lg:gap-8 items-center'>
                      <ConsoleCard image={n64} gif={n64Gif} name={"N64"} numberOfGames={numberOfGames["n64"]} />
                      <ConsoleCard image={nds} gif={ndsGif} name={"NDS"} numberOfGames={numberOfGames["nds"]} />
                    </div>
                  </div>
                </div>
                <div className='basis-1/2 flex flex-col'>
                  <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-3xl text-center`}>Features</h1>
                  <div className='h-full flex flex-col gap-8 justify-center items-center'>
                    <div className='relative'>
                      <StyledTextCard text={"Wide game selection"} gradientColor={"from-red-500 to-orange-500"} />
                      <Image className='absolute -top-12 -left-28 -rotate-[30deg] opacity-25' src={oneUp} width={64} height={64} />
                    </div>
                    <StyledTextCard text={"User-friendly interface"} gradientColor={"from-green-500 to-yellow-500"} />
                    <StyledTextCard text={"User-friendly interface"} gradientColor={"from-yellow-500 to-orange-500"} />
                    <StyledTextCard text={"Multiplayer options Available"} gradientColor={"from-blue-500 to-teal-500"} />
                    <div className='relative'>
                      <StyledTextCard text={"Accessible on multiple devices"} gradientColor={"from-teal-500 to-emerald-500"} />
                      <Image className='absolute -bottom-12 -right-28 rotate-[30deg] opacity-25' src={triforce} width={64} height={64} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col mx-auto'>
                <h1 className={`${ps2p.variable} font-ps2p mt-2 mb-3 text-2xl Lg:text-3xl text-center`}>Compability</h1>
                <div className=' mx-auto flex gap-5'>
                  <FaSafari size={28} />
                  <SiFirefoxbrowser size={28} />
                  <SiGooglechrome size={28} />
                  <SiOpera size={28} />
                  <SiBrave size={28} />
                </div>
              </div>
            </div>
            <div className='absolute bottom-1.5 inset-x-0 w-full'>
              <IoCaretDownSharp
                className='animate-bounce mx-auto duration-300' size={28}
                onClick={scroll2Page2}
              /></div>
          </section>

          <section className='relative' ref={page2Ref}>
            <Image className='absolute z-0' src={metroidBackground} fill />
            <div className='z-10 mx-auto flex flex-col justify-center items-center gap-5'>
              <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-4xl text-center`}>Thanks for playing!</h1>
              <div className='flex gap-5'>
                <Link href={"https://datdadev.ddns.net"} target='_blank' className={`${ps2p.variable} font-ps2p underline`}>Contact</Link>
                <div className='bg-white w-1 h-6' />
                <Link href={"https://patreon.com/DatDaDev"} target='_blank' className={`${ps2p.variable} font-ps2p underline`}>Support</Link>
              </div>
              <Image data-speed="2" className='layer mt-5' src={samusShip} />
            </div>
          </section>
        </div>

        <Script type='text/javascript'>
          {`document.addEventListener("mousemove", parallax);
          function parallax(e) {
            this.querySelectorAll('.layer').forEach(layer => {
              const speed = layer.getAttribute('data-speed')

              const x = (window.innerWidth - e.pageX * speed)/100
              const y = (window.innerWidth - e.pageY * speed)/100

              layer.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)'
            })
          }`}
        </Script>
      </main>
    </>
  )
}