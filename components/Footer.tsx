import React from 'react';
import Image from "next/dist/client/legacy/image";

const Footer = () => {
    return (
        <div className={'w-full h-full bg-[#000A23] px-20 flex justify-between items-center'}>
            <div className={'w-96 grid grid-cols-2'}>
                <div className={'col-span-2 h-20 relative'}>
                    <Image src={'/images/logo.svg'} layout={'fill'}></Image>
                </div>
                <div className={'hidden sm:flex justify-start mt-4 items-center'}>
                    <p className={'text-xs text-center text-white underline font-player'}>Mint !</p>
                </div>
                <div className={'hidden sm:flex justify-start mt-4 items-center'}>
                    <p className={'text-xs text-center text-white underline font-player'}>Road Map</p>
                </div>
                <div className={'hidden sm:flex justify-start mt-4 items-center'}>
                    <p className={'text-xs text-center text-white underline font-player'}>Our comand</p>
                </div>
                <div className={'hidden sm:flex justify-start mt-4 items-center'}>
                    <p className={'text-xs text-center text-white underline font-player'}>DAO</p>
                </div>
            </div>
            <div className={'hidden sm:flex col-span-2 justify-around items-center'}>
                <div className={'relative w-16 mx-4 h-16'}>
                    <Image src={'/images/twitter.svg'} layout={'fill'}></Image>
                </div>
                <div className={'relative w-16 mx-4 h-16'}>
                    <Image src={'/images/telegram.svg'} layout={'fill'}></Image>
                </div>
                <div className={'relative w-16 mx-4 h-16'}>
                    <Image src={'/images/gitbook.svg'} layout={'fill'}></Image>
                </div>
            </div>
        </div>
    );
};

export default Footer;