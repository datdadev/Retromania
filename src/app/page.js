'use client'
import Link from 'next/link';
import Image from 'next/image'
import {
  Press_Start_2P as PS2P,
  VT323,
} from 'next/font/google';
import { IoCaretDownSharp } from "react-icons/io5"
import { SiFirefoxbrowser, SiGooglechrome, SiOpera, SiBrave } from "react-icons/si"
import { FaSafari } from "react-icons/fa"

import Player from './components/player';
import NavBar from './components/navBar';
import pipe from "../../public/assets/images/pipe.png";

var scrollIntoView = require('scroll-into-view')
import { useRef } from 'react';

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
  const scroll2Page1 = () => page1Ref.current.scrollIntoView({behavior: 'smooth'});
  const scroll2Page2 = () => page2Ref.current.scrollIntoView({behavior: 'smooth'});   
  return (
    <>
      <main className="bg-black min-h-screen relative">
        <NavBar />

        <div className='my-container'>
          <section className='relative'>
            <Image
              className='absolute top-[calc(100vh-285px)] hover:top-[calc(100vh-300px)] duration-150'
              src={pipe}
              alt=''
              width={128}
              height={0}
            />
            <div className='p-12 Lg:px-16 xl:px-36 mx-auto flex flex-col-reverse Lg:flex-row gap-5 Lg:gap-12 items-center'>
              <div className='basis-1/2 aspect-[4/3] border-white border-4'><Player /></div>
              <div className='basis-1/2'>
                <div className='pb-1 md:pb-4 flex justify-center Lg:justify-start items-center'>
                  <div className='flex flex-col'>
                    <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-4xl`}>RETROMANIA</h1>
                    <h2 className={`${ps2p.variable} font-ps2p text-md Lg:text-xl text-white/50`}>best retro site</h2>
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
            <IoCaretDownSharp
            className='absolute w-full bottom-1.5 inset-x-0 scale-100 hover:scale-125 duration-300' size={28}
            onClick={scroll2Page1}
            />
          </section>

          <section ref={page1Ref} className='relative py-16'>
            <div className='w-full flex flex-col justify-between'>
              <div className='flex'>
                <div className='basis-1/2'>
                  <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-3xl text-center`}>Available</h1>
                </div>
                <div className='basis-1/2'>
                  <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-3xl text-center`}>Features</h1>
                </div>
              </div>
              <div className='flex flex-col mx-auto'>
                <h1 className={`${ps2p.variable} font-ps2p mb-5 text-2xl Lg:text-3xl text-center`}>Compability</h1>
                <div className=' mx-auto flex gap-5'>
                  <FaSafari size={28} />
                  <SiFirefoxbrowser size={28} />
                  <SiGooglechrome size={28} />
                  <SiOpera size={28} />
                  <SiBrave size={28} />
                </div>
              </div>
            </div>
            <IoCaretDownSharp
            className='absolute w-full bottom-1.5 inset-x-0 scale-100 hover:scale-125 duration-300' size={28}
            onClick={scroll2Page2}
            />
          </section>

          <section ref={page2Ref}>
            <div className='mx-auto flex flex-col justify-center items-center gap-5'>
              <h1 className={`${ps2p.variable} font-ps2p text-2xl Lg:text-4xl text-center`}>Thanks for playing!</h1>
              <Link href={"https://www.youtube.com/watch?v=xvFZjo5PgG0"} target='_blank' className={`${ps2p.variable} font-ps2p underline`}>About</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
