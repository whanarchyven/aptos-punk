import React from 'react';
import Image from "next/dist/client/legacy/image";


const Navbar = (props:any) => {
    return (
        <div className={'w-full h-full grid grid-cols-3 sm:grid-cols-12 gap-4 bg-black items-center'}>
            <div className={'border-2 border-black col-span-2 sm:col-start-1 sm:col-end-4 flex justify-center items-center'}>
                <a href={'#main'} className={'w-4/5 sm:w-72 h-12 relative'}>
                    <Image src={'/images/logo.svg'} layout={'fill'}></Image>
                </a>
            </div>
            <div className={'hidden sm:block col-span-1'}>

            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <a href={'#main'} className={'aptos-link text-xs text-center text-white font-player'}>Mint !</a>
            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <a href={'#roadmap'} className={'aptos-link text-xs text-center text-white font-player'}>Road Map</a>
            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <a href={'#team'} className={'aptos-link text-xs text-center text-white font-player'}>Our team</a>
            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <a href={'#dao'} className={'aptos-link text-xs text-center text-white font-player'}>DAO</a>
            </div>
            <div className={'hidden sm:flex col-span-2 justify-around items-center'}>
                <a href={'https://twitter.com/Aptos_Humans'} className={'relative w-10 h-10'}>
                    <Image src={'/images/twitter.svg'} layout={'fill'}></Image>
                </a>
                <a href={'https://discord.gg/GTxqPCAc'} className={'relative w-10 h-10'}>
                    <Image src={'/images/telegram.svg'} layout={'fill'}></Image>
                </a>
                <a href={'https://studio-seo.gitbook.io/aptos-humans/'} className={'relative w-10 h-10'}>
                    <Image src={'/images/gitbook.svg'} layout={'fill'}></Image>
                </a>
            </div>
            <div className={'border-l-2 sm:col-span-2 border-white h-full flex justify-center items-center'}>
                {props.children}
            </div>
        </div>
    );
};

export default Navbar;