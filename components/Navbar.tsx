import React from 'react';
import Image from "next/dist/client/legacy/image";


const Navbar = (props:any) => {
    return (
        <div className={'w-full h-full grid grid-cols-3 sm:grid-cols-12 gap-4 bg-black items-center'}>
            <div className={'border-2 border-black col-span-2 sm:col-start-1 sm:col-end-4 flex justify-center items-center'}>
                <div className={'w-4/5 sm:w-72 h-12 relative'}>
                    <Image src={'/images/logo.svg'} layout={'fill'}></Image>
                </div>
            </div>
            <div className={'hidden sm:block col-span-1'}>

            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <p className={'text-xs text-center text-white font-player'}>Mint !</p>
            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <p className={'text-xs text-center text-white font-player'}>Road Map</p>
            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <p className={'text-xs text-center text-white font-player'}>Our comand</p>
            </div>
            <div className={'hidden sm:flex justify-center items-center'}>
                <p className={'text-xs text-center text-white font-player'}>DAO</p>
            </div>
            <div className={'hidden sm:flex col-span-2 justify-around items-center'}>
                <div className={'relative w-10 h-10'}>
                    <Image src={'/images/twitter.svg'} layout={'fill'}></Image>
                </div>
                <div className={'relative w-10 h-10'}>
                    <Image src={'/images/telegram.svg'} layout={'fill'}></Image>
                </div>
                <div className={'relative w-10 h-10'}>
                    <Image src={'/images/gitbook.svg'} layout={'fill'}></Image>
                </div>
            </div>
            <div className={'border-l-2 sm:col-span-2 border-white h-full flex justify-center items-center'}>
                {props.children}
            </div>
        </div>
    );
};

export default Navbar;