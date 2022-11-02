import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar";
import Image from "next/dist/client/legacy/image";
import {useState} from "react";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";

import MyTimer from "../components/Timer"

export default function Home() {

    const [totalSupply, setTotalSupply] = useState(0)
    const [whiteList, setWhiteList] = useState(0)

    const [activeQuarter, setActiveQuarter] = useState(1)


    const roadmap = [
        {
            id: 1,
            title: '4Q 2021',
            description: 'Creation of the concept',
        },
        {
            id: 2,
            title: '4Q 2021',
            description: 'Creating and testing contract',
        },
        {
            id: 3,
            title: '4Q 2021',
            description: 'Mint first Aptos PUNKS colletion',
        },
        {
            id: 4,
            title: '4Q 2021',
            description: 'PUNKS DAO',
        },
        {
            id: 5,
            title: '1Q 2022',
            description: 'Punks Wallet',
        }, {
            id: 6,
            title: '1Q 2022',
            description: 'WL contest for genesis holders',
        }, {
            id: 7,
            title: '3Q 2022',
            description: 'Aptos Punks Gen 2 collection',
        }, {
            id: 8,
            title: '3Q 2022',
            description: 'Punks NFT Metaverse.',
        }, {
            id: 9,
            title: '3Q 2022',
            description: 'Ethereum & Solana Crosschain',
        },
    ]


    const team = [
        {
            name: 'Ivan Zaburdaev',
            post: 'CEO',
            avatar: '1.png',
        },
        {
            name: 'Ivan Zaburdaev',
            post: 'CMO',
            avatar: '2.png',
        },
        {
            name: 'Ivan Zaburdaev',
            post: 'CTO',
            avatar: '3.png',
        },
        {
            name: 'Ivan Zaburdaev',
            post: 'Head of develop',
            avatar: '4.png',
        },
        {
            name: 'Ivan Zaburdaev',
            post: 'Marketing manager',
            avatar: '5.png',
        },
    ]


    const tempDate='2022-11-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    return (
        <div>
            <Head>
                <title>ATOS PUNKS</title>
                <meta name="description" content="ATOS PUNKS NFT DAO"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>

                {/*Navbar*/}

                <div className={'w-full fixed h-16 z-50'}>
                    <Navbar></Navbar>
                </div>


                {/*Main block*/}

                <div
                    className={'block h-[100vh] pt-16 relative border-2 border-black bg-[url("../public/images/main_background.png")] bg-cover'}>
                    <div className={'absolute hidden sm:flex w-full bottom-0 h-[22vw]'}>
                        <Image src={'/images/main_bg.png'} layout={'fill'}></Image>
                    </div>
                    <div className={'absolute flex sm:hidden w-full bottom-0 h-[40vw]'}>
                        <Image src={'/images/main_bg_mobile.png'} layout={'fill'}></Image>
                    </div>
                    <div className={'w-full p-4 mt-10 flex justify-between items-center'}>
                        <div className={'w-40 h-40 sm:w-72  sm:h-72 flex justify-center items-center relative'}>
                            <div className={'absolute z-0 top-0 left-0 w-full h-full'}>
                                <Image src={'/images/main_round.png'} layout={'fill'}></Image>
                            </div>
                            <p className={'z-[5] text-white font-player text-xs sm:text-xl text-center'}>Total supply<br/><span
                                className={'text-sm sm:text-5xl'}>{totalSupply}/3000</span></p>
                        </div>
                        <div className={'w-3/5 mx-5 h-32 hidden sm:flex relative'}>
                            <Image src={'/images/logo.svg'} layout={'fill'}></Image>
                        </div>
                        <div className={'w-40 h-40 sm:w-72  sm:h-72 flex justify-center items-center relative'}>
                            <div className={'absolute z-0 top-0 left-0 w-full h-full'}>
                                <Image src={'/images/main_round.png'} layout={'fill'}></Image>
                            </div>
                            <p className={'z-[5] text-white font-player text-sm sm:text-5xl text-center'}>WL<br/><span
                                className={'text-sm sm:text-5xl'}>{whiteList}/500</span></p>
                        </div>
                    </div>
                    <div className={'w-full sm:hidden'}>
                        <MyTimer expiryTimestamp={time}></MyTimer>
                    </div>
                    <div className={'w-full sm:hidden mt-8 flex justify-center items-center'}>
                        <div className={'w-80 h-16 relative'}>
                            <Image src={'/images/mint_button.svg'} layout={'fill'}></Image>
                        </div>
                    </div>
                </div>


                {/*PUNKS DAO*/}

                <div className={'block w-full py-20 h-[484px] sm:h-[692px] bg-[url("../public/images/dao_bg.png")] bg-cover flex justify-center items-center'}>
                    <div className={'w-[1160px] hidden sm:flex h-[612px] relative'}>
                        <Image src={'/images/dao.svg'} layout={'fill'}></Image>
                    </div>
                    <div className={'w-[308px] flex sm:hidden h-[375px] relative'}>
                        <Image src={'/images/dao_mobile.svg'} layout={'fill'}></Image>
                    </div>
                </div>


                {/*Roadmap*/}

                <div className={'block w-full py-10 bg-[url("../public/images/roadmap.png")] bg-cover px-3 sm:px-20'}>
                    <p className={'text-4xl font-game text-white sm:text-8xl w-full py-10'}>ROADMAP</p>
                    <div className={'w-full py-20 h-full flex-wrap flex-col flex relative justify-start items-start'}>
                        <div className={'w-32 sm:w-60 h-full flex justify-center absolute top-0'}>
                            <div className={'w-4 sm:w-6 h-full rounded-t-full rounded-b-full bg-white'}>
                            </div>
                        </div>
                        {roadmap.map((item,counter) => {
                            return (
                                <div  key={counter}  className={'flex justify-center my-3 sm:my-10 items-center'}>
                                    {activeQuarter == item.id ?
                                        <div
                                            className={'w-32 h-32 sm:w-60 sm:mr-5 sm:h-60 relative rounded-full bg-black flex justify-center items-center'}>
                                            <div className={'w-full h-full absolute top-0 left-0'}>
                                                <Image src={'/images/main_round.png'} layout={'fill'}></Image>
                                            </div>
                                            <p className={'z-[5] text-white font-player text-2xl sm:text-7xl text-center'}>{item.id}</p>
                                        </div>
                                        :
                                        <div className={'w-32 h-20 sm:w-60 sm:mr-5 sm:h-48 flex justify-center'}>
                                            <div
                                                className={'w-20 h-20 sm:w-48  sm:h-48 relative rounded-full bg-black flex justify-center items-center'}>
                                                <div className={'w-full h-full absolute top-0 left-0'}>
                                                    <Image src={'/images/main_round.png'} layout={'fill'}></Image>
                                                </div>
                                                <p className={'z-[5] text-white font-player text-lg sm:text-5xl text-center'}>{item.id}</p>
                                            </div>
                                        </div>}
                                    <p className={'font-player text-xs sm:text-3xl text-white'}>{item.title}:</p>
                                    <p className={'font-jost text-white text-xs sm:text-3xl leading-[100%]'}>{item.description}</p>
                                </div>

                            )

                        })}

                    </div>
                </div>


                {/*OUR COMMAND*/}

                <div className={'block py-10 w-full bg-black'}>
                    <p className={'font-game text-white text-4xl sm:text-8xl text-center w-full py-10'}>OUR TEAM</p>
                    <div className={'w-full px-4 sm:px-16 flex justify-center items-center flex-wrap'}>
                        {team.map((item,counter)=>{return (
                            <div key={counter} className={'flex flex-col mb-5 flex-wrap mx-2 sm:mx-10 justify-center items-center'}>
                                <div
                                    className={'w-24 h-24 sm:w-72  sm:h-72 relative rounded-full bg-black flex justify-center items-center'}>
                                    <div className={'w-full h-full absolute'}>
                                        <Image src={`/images/punks/${item.avatar}`} layout={'fill'}></Image>
                                    </div>
                                </div>
                                <p className={'text-white my-1 text-xs sm:text-xl uppercase font-player'}>{item.name}</p>
                                <p className={'text-white my-1 text-xs sm:text-2xl uppercase font-game'}>{item.post}</p>
                            </div>
                        )})}
                    </div>
                </div>

                {/*FOOTER*/}

                <div className={'block w-full h-[269px]'}>
                    <Footer></Footer>
                </div>

            </main>

        </div>
    )
}
