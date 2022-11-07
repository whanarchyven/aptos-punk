import React from 'react';
import Image from "next/dist/client/legacy/image";

const Footer = () => {
    return (
        <div className={'w-full h-full bg-[#000A23] px-3 sm:px-20 sm:flex justify-between items-center'}>
            <div className={'w-72 sm:w-96 grid grid-cols-2'}>
                <div className={'col-span-2 h-20 relative'}>
                    <Image src={'/images/logo.svg'} layout={'fill'}></Image>
                </div>
                <div className={'flex justify-start mt-4 items-center'}>
                    <a href={'#main'} className={'text-xs text-center text-white underline font-player'}>Mint !</a>
                </div>
                <div className={'flex justify-start mt-4 items-center'}>
                    <a href={'#roadmap'} className={'text-xs text-center text-white underline font-player'}>Road Map</a>
                </div>
                <div className={'flex justify-start mt-4 items-center'}>
                    <a href={'#team'} className={'text-xs text-center text-white underline font-player'}>Our team</a>
                </div>
                <div className={'flex justify-start mt-4 items-center'}>
                    <a href={'#dao'} className={'text-xs text-center text-white underline font-player'}>DAO</a>
                </div>
            </div>
            <div className={'mt-8 sm:mt-0 flex justify-around items-center'}>
                <a href={'https://twitter.com/Aptos_Humans'} className={'relative w-16 mx-4 h-16'}>
                    <Image src={'/images/twitter.svg'} layout={'fill'}></Image>
                </a>
                <a href={'https://discord.gg/GTxqPCAc'} className={'relative w-16 mx-4 h-16'}>
                    <Image src={'/images/telegram.svg'} layout={'fill'}></Image>
                </a>
                <a href={'https://studio-seo.gitbook.io/aptos-humans/'} className={'relative w-16 mx-4 h-16'}>
                    <Image src={'/images/gitbook.svg'} layout={'fill'}></Image>
                </a>
            </div>
        </div>
    );
};

export default Footer;