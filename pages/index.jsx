import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar";
import Image from "next/dist/client/legacy/image";
import {useState, useEffect} from "react";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";
import {motion} from 'framer-motion';
import {animate} from '../animations/animations'
import MyTimer from "../components/Timer"


// BACKEND


import {AptosClient} from "aptos";
import {useWallet} from '@manahippo/aptos-wallet-adapter';
import cmHelper from "../helpers/candyMachineHelper"
import ConnectWalletButton from '../helpers/Aptos/ConnectWalletButton';
import {
    candyMachineAddress,
    collectionName,
    collectionCoverUrl,
    NODE_URL,
    CONTRACT_ADDRESS,
    COLLECTION_SIZE
} from "../helpers/candyMachineInfo"

import {toast} from 'react-toastify';
import axios from "axios";

const aptosClient = new AptosClient(NODE_URL);
const autoCmRefresh = 10000;


export default function Home() {


    const wallet = useWallet();
    const [isFetchignCmData, setIsFetchignCmData] = useState(false)
    const [candyMachineData, setCandyMachineData] = useState({data: {}, fetch: fetchCandyMachineData})
    const [timeLeftToMint, setTimeLeftToMint] = useState({presale: "", public: "", timeout: null})

    const [mintInfo, setMintInfo] = useState({numToMint: 1, minting: false, success: false, mintedNfts: []})

    const [canMint, setCanMint] = useState(false)

    useEffect(() => {
        if (!wallet.autoConnect && wallet.wallet?.adapter) {
            wallet.connect();
        }
    }, [wallet.autoConnect, wallet.wallet, wallet.connect]);

    const mint = async () => {
        if (wallet.account?.address?.toString() === undefined || mintInfo.minting) return;
        setMintInfo({...mintInfo, minting: true})
        // Generate a transaction
        const payload = {
            type: "entry_function_payload",
            function: `${CONTRACT_ADDRESS}::candy_machine_v2::mint_tokens`,
            type_arguments: [],
            arguments: [
                candyMachineAddress,
                collectionName,
                mintInfo.numToMint,
            ]
        };

        let txInfo;
        try {
            const txHash = await wallet.signAndSubmitTransaction(payload);
            txInfo = await aptosClient.waitForTransactionWithResult(txHash.hash)
        } catch (err) {
            txInfo = {
                success: false,
                vm_status: err.message,
            }
        }
        handleMintTxResult(txInfo)
        if (txInfo.success) setCandyMachineData({
            ...candyMachineData,
            data: {
                ...candyMachineData.data,
                numMintedTokens: (parseInt(candyMachineData.data.numMintedTokens) + parseInt(mintInfo.numToMint)).toString()
            }
        })
    }

    async function handleMintTxResult(txInfo) {
        const mintSuccess = txInfo.success;


        let mintedNfts = []
        if (!mintSuccess) {
            /// Handled error messages
            const handledErrorMessages = new Map([
                ["Failed to sign transaction", "An error occured while signing."],
                ["Move abort in 0x1::coin: EINSUFFICIENT_BALANCE(0x10006): Not enough coins to complete transaction", "Insufficient funds to mint."],
            ]);

            const txStatusError = txInfo.vm_status;
            let errorMessage = handledErrorMessages.get(txStatusError);
            errorMessage = errorMessage === undefined ? "Unkown error occured. Try again." : errorMessage;

            toast.error(errorMessage);
        } else {
            mintedNfts = await cmHelper.getMintedNfts(aptosClient, candyMachineData.data.tokenDataHandle, candyMachineData.data.cmResourceAccount, collectionName, txInfo)
            toast.success("Minting success!")
        }


        setMintInfo({...mintInfo, minting: false, success: mintSuccess, mintedNfts})
    }


    async function fetchCandyMachineData(indicateIsFetching = false) {

        if (indicateIsFetching) setIsFetchignCmData(true)
        const cmResourceAccount = await cmHelper.getCandyMachineResourceAccount();
        if (cmResourceAccount === null) {
            setCandyMachineData({...candyMachineData, data: {}})
            setIsFetchignCmData(false)
            return
        }

        const collectionInfo = await cmHelper.getCandyMachineCollectionInfo(cmResourceAccount);
        const configData = await cmHelper.getCandyMachineConfigData(collectionInfo.candyMachineConfigHandle);
        setCandyMachineData({...candyMachineData, data: {cmResourceAccount, ...collectionInfo, ...configData}})
        setIsFetchignCmData(false)
    }

    function verifyTimeLeftToMint() {
        const mintTimersTimeout = setTimeout(verifyTimeLeftToMint, 1000)
        if (candyMachineData.data.presaleMintTime === undefined || candyMachineData.data.publicMintTime === undefined) return

        const currentTime = Math.round(new Date().getTime() / 1000);
        setTimeLeftToMint({
            timeout: mintTimersTimeout,
            presale: cmHelper.getTimeDifference(currentTime, candyMachineData.data.presaleMintTime),
            public: cmHelper.getTimeDifference(currentTime, candyMachineData.data.publicMintTime)
        })
    }

    useEffect(() => {
        fetchCandyMachineData(true)
        setInterval(fetchCandyMachineData, autoCmRefresh)
    }, [])

    useEffect(() => {
        clearTimeout(timeLeftToMint.timeout)
        verifyTimeLeftToMint()

        console.log(candyMachineData.data)
    }, [candyMachineData])

    // useEffect(() => {
    //   setCanMint(wallet.connected && candyMachineData.data.isPublic && parseInt(candyMachineData.data.numUploadedTokens) > parseInt(candyMachineData.data.numMintedTokens) && timeLeftToMint.presale === "LIVE")
    // }, [wallet, candyMachineData, timeLeftToMint])
    useEffect(() => {
        setCanMint(true)
    }, [wallet, candyMachineData, timeLeftToMint])


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
            description: 'Mint first Aptos HUMANS colletion',
        },
        {
            id: 4,
            title: '4Q 2021',
            description: 'HUMANS DAO',
        },
        {
            id: 5,
            title: '1Q 2022',
            description: 'Humans Wallet',
        },
    ]

    const roadmap2 = [
        {
            id: 6,
            title: '1Q 2022',
            description: 'WL contest for genesis holders',
        }, {
            id: 7,
            title: '3Q 2022',
            description: 'Aptos Humans Gen 2 collection',
        }, {
            id: 8,
            title: '3Q 2022',
            description: 'Humans NFT Metaverse.',
        }, {
            id: 9,
            title: '3Q 2022',
            description: 'Ethereum & Solana Crosschain',
        },
    ]


    const roadmapFull = [
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
            description: 'Mint first Aptos HUMANS colletion',
        },
        {
            id: 4,
            title: '4Q 2021',
            description: 'HUMANS DAO',
        },
        {
            id: 5,
            title: '1Q 2022',
            description: 'Humans Wallet',
        },
        {
            id: 6,
            title: '1Q 2022',
            description: 'WL contest for genesis holders',
        }, {
            id: 7,
            title: '3Q 2022',
            description: 'Aptos Humans Gen 2 collection',
        }, {
            id: 8,
            title: '3Q 2022',
            description: 'Humans NFT Metaverse.',
        }, {
            id: 9,
            title: '3Q 2022',
            description: 'Ethereum & Solana Crosschain',
        },
    ]


    const team = [
        {
            name: 'Kriss Linn',
            post: 'CEO',
            avatar: '1.png',
        },
        {
            name: 'Alex Clay',
            post: 'CMO',
            avatar: '2.png',
        },
        {
            name: 'Jou Sheng',
            post: 'CTO',
            avatar: '3.png',
        },
        {
            name: 'Sara Margert',
            post: 'Head of develop',
            avatar: '4.png',
        },
        {
            name: 'Nguyen Trang',
            post: 'Marketing manager',
            avatar: '5.png',
        },
    ]


    const tempDate = '2022-11-26T10:00:00.301Z'

    const time = new Date();
    const secondsFull = Math.floor((new Date(tempDate).valueOf() - new Date().valueOf()) / 1000)
    time.setSeconds(secondsFull)

    const [isUserInWhiteList, setIsUserInWhiteList] = useState(false)

    const fetchWL = async () => {
        axios.get('https://script.googleusercontent.com/macros/echo?user_content_key=oph2KGT62f7d6fc7SbdhmEb0z9vO0Psqa2fZlbw7gM-WrXhHrhPUugwUtWMXnXWSQWNIh0X9uK6K_k4lI5_yxIBcUn4WTxoBm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPwYZP8L4FFprSxLcl_1uXyFYzMWOa5tavUwNu98-8prKeKt2xYh_dcPAAHX3qcUbdf_5h7dO4VaozjJBv57y7haalhj3AWQZA&lib=MevTwhkZ-UhBqiQNDyENGdFVlhdY713ER').then((res) => {
            res.data.result.map((item) => {
                if ('0xa938ed623c3bccf59d22db6e95eb59fe354b037c0fe17acc3ab0404eeb72bf89' == item[0]) {
                    setIsUserInWhiteList(true)
                }
            })
        })
    }

    fetchWL();

    return (
        <div>
            <Head>
                <title>APTOS HUMANS</title>
                <meta name="description" content="ATOS PUNKS NFT DAO"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>

                {/*Navbar*/}

                <div className={'w-full fixed h-16 z-50'}>
                    <Navbar>
                        <ConnectWalletButton connectButton={!wallet.connected}
                                             className="w-full items-center flex h-5"/>
                    </Navbar>
                </div>


                {/*Main block*/}

                <div id={'main'}
                     className={'block h-[120vh] overflow-x-hidden pt-16 relative border-2 border-black bg-[url("../public/images/main_background.png")] bg-cover'}>
                    <div className={'absolute hidden sm:flex w-full bottom-0 h-[17vw]'}>
                        <Image src={'/images/main_bg.png'} layout={'fill'}></Image>
                    </div>
                    <div className={'absolute flex sm:hidden w-full bottom-0 h-[40vw]'}>
                        <Image src={'/images/main_bg_mobile.png'} layout={'fill'}></Image>
                    </div>
                    <div className={'w-full h-32 relative'}>
                        <Image src={'/images/logo.svg'} layout={'fill'}></Image>
                    </div>
                    <div className={'w-full p-1 sm:p-4 mt-10 flex justify-between items-start'}>
                        <motion.div
                            className={'w-60 h-80 mx-2 sm:w-96 sm:h-96 flex-wrap flex justify-center items-center relative'}
                            initial={'hidden'} whileInView={'visible'}
                            viewport={{once: true}}
                            transition={animate.transitionSecond}
                            variants={animate.animateFadeInRight}>
                            <div className={'absolute z-0 top-0 left-0 w-full h-full'}>
                                <Image src={'/images/main_rectangle.png'} layout={'fill'}></Image>
                            </div>
                            <p className={'z-[5] text-white font-player text-xs sm:text-lg text-center'}>Total
                                supply<br/><span
                                    className={'text-xs sm:text-2xl'}>{candyMachineData.data.numMintedTokens}/3000</span>
                            </p>
                            <p className={'z-[5] text-white font-player text-xs sm:text-lg text-center'}>Whitelist<br/> spot<br/><span
                                className={'text-xs sm:text-2xl'}>500/500</span></p>
                        </motion.div>
                        <motion.div className={'w-3/5 mx-5 h-32 hidden flex-wrap sm:flex relative'}
                                    initial={'hidden'} whileInView={'visible'}
                                    viewport={{once: true}}
                                    transition={animate.transitionSecond}
                                    variants={animate.animateZoomIn}>
                            <div className={'w-full flex justify-center'}>
                                <div className={'w-96 h-96 relative'}>
                                    <Image src={'/images/punks.gif'} layout={'fill'}></Image>
                                </div>
                            </div>
                            <div className={'w-full mt-4 '}>
                                <div className={'flex flex-wrap justify-center text-center'}>
                                    <p className={'text-white font-player'}>Time to left:</p>
                                    <p className={'font-player  text-sm text-white'}>{timeLeftToMint.presale.days ? timeLeftToMint.presale.days : '0'} days {timeLeftToMint.presale.hours ? timeLeftToMint.presale.hours : '0'} hours {timeLeftToMint.presale.minutes ? timeLeftToMint.presale.minutes : '0'} minutes</p>
                                </div>
                            </div>
                            <div className={'w-full  mt-8 flex justify-center items-center'}>
                                <div className={'cursor-pointer w-80 h-16 relative'} onClick={() => {
                                    if (wallet.account) {
                                        if (isUserInWhiteList) {
                                            if (candyMachineData.data.numMintedTokens == 300) {
                                                alert('Whitelist limit exceeded')
                                            } else {
                                                mint()
                                            }
                                        } else if ((timeLeftToMint.public.days == 0 && timeLeftToMint.public.seconds == 0 && timeLeftToMint.public.hours == 0 && timeLeftToMint.public.minutes == 0)) {
                                            mint()
                                        } else {
                                            alert('You are not in White List')
                                        }
                                    } else {
                                        alert('Connect wallet!')
                                    }
                                }}>
                                    <Image src={'/images/mint_button.svg'} layout={'fill'}></Image>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className={'w-60 mx-2 h-80 sm:w-96  py-5 sm:h-96 flex flex-wrap justify-center relative'}
                            initial={'hidden'} whileInView={'visible'}
                            viewport={{once: true}}
                            transition={animate.transitionSecond}
                            variants={animate.animateFadeInLeft}>
                            <div className={'absolute z-0 top-0 left-0 w-full h-full'}>
                                <Image src={'/images/main_rectangle.png'} layout={'fill'}></Image>
                            </div>
                            <p className={'z-[5] text-white font-player text-[0.5rem] sm:text-lg text-center'}>1-st <br/>batch:
                            </p>
                            <div className={'w-4/5 flex items-center sm:grid sm:grid-cols-2'}>
                                <p className={'text-white font-player text-[0.5rem] sm:text-2xl mx-2 sm:justify-self-end'}>1000</p>
                                <p className={'text-white font-player text-[0.5rem] sm:text-2xl mx-2'}>NFT</p>
                            </div>
                            <div className={'w-4/5 flex items-center sm:grid sm:grid-cols-2'}>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-2xl mx-2 sm:justify-self-end'}>300</p>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>for
                                    WL<br/>mint</p>
                            </div>
                            <div className={'w-4/5 flex items-center sm:grid sm:grid-cols-2'}>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-2xl mx-2 sm:justify-self-end'}>700</p>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>public<br/>mint
                                </p>
                            </div>
                            <p className={'z-[5] text-white font-player text-[0.5rem] sm:text-lg text-center'}>price:</p>
                            <div className={'w-4/5 flex items-center my-2 sm:grid sm:grid-cols-2'}>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>WL
                                    mint:</p>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>{candyMachineData.data.mintFee} $APT</p>
                            </div>
                            <div className={'w-4/5 flex items-center my-2 sm:grid sm:grid-cols-2'}>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>public<br/>mint
                                </p>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>4
                                    $APT</p>

                            </div>
                            <div className={'w-4/5 flex items-center my-2 sm:grid sm:grid-cols-2'}>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>Limit</p>
                                <p className={'text-white font-player text-[0.5rem] leading-[100%] sm:text-xs mx-2'}>2
                                    NFT</p>
                            </div>
                        </motion.div>

                    </div>
                    <motion.div className={'w-full p-2 h-32 flex sm:hidden flex-wrap sm:flex relative'}
                                initial={'hidden'} whileInView={'visible'}
                                viewport={{once: true}}
                                transition={animate.transitionSecond}
                                variants={animate.animateZoomIn}>
                        <div className={'w-full '}>
                            <div className={'flex  flex-wrap justify-center text-center'}>
                                <p className={'text-white font-player'}>Time to left:</p>
                                <p className={'font-player  text-sm text-white'}>{timeLeftToMint.presale.days ? timeLeftToMint.presale.days : '0'} days {timeLeftToMint.presale.hours ? timeLeftToMint.presale.hours : '0'} hours {timeLeftToMint.presale.minutes ? timeLeftToMint.presale.minutes : '0'} minutes</p>
                            </div>
                        </div>
                        <div className={'w-full  mt-8 flex justify-center items-center'}>
                            <div className={'cursor-pointer w-80 h-16 relative'} onClick={() => {
                                if (wallet.account) {
                                    if (isUserInWhiteList) {
                                        if (candyMachineData.data.numMintedTokens == 300) {
                                            alert('Whitelist limit exceeded')
                                        } else {
                                            mint()
                                        }
                                    } else if ((timeLeftToMint.public.days == 0 && timeLeftToMint.public.seconds == 0 && timeLeftToMint.public.hours == 0 && timeLeftToMint.public.minutes == 0)) {
                                        mint()
                                    } else {
                                        alert('You are not in White List')
                                    }
                                } else {
                                    alert('Connect wallet!')
                                }
                            }}>
                                <Image src={'/images/mint_button.svg'} layout={'fill'}></Image>
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/*PUNKS DAO*/}

                <div id={'dao'}
                     className={'block w-full py-20 h-[484px] sm:h-[692px] bg-black bg-cover flex justify-center items-center'}>
                    <motion.div className={'w-[1160px] hidden sm:flex h-[612px] relative'} initial={'hidden'}
                                whileInView={'visible'}
                                viewport={{once: true}}
                                transition={animate.transitionSecond}
                                variants={animate.animateZoomIn}>
                        <Image src={'/images/dao.svg'} layout={'fill'}></Image>
                    </motion.div>
                    <motion.div className={'w-[308px] flex sm:hidden h-[375px] relative'} initial={'hidden'}
                                whileInView={'visible'}
                                viewport={{once: true}}
                                transition={animate.transitionSecond}
                                variants={animate.animateZoomIn}>
                        <Image src={'/images/dao_mobile.svg'} layout={'fill'}></Image>
                    </motion.div>
                </div>


                {/*Roadmap*/}

                <div className={'block w-full py-10 bg-[url("../public/images/roadmap.png")] bg-cover px-3 sm:px-20'}
                     id={'roadmap'}>
                    <motion.p className={'text-4xl font-game text-white sm:text-8xl w-full py-10'} initial={'hidden'}
                              whileInView={'visible'}
                              viewport={{once: true}}
                              transition={animate.transitionSecond}
                              variants={animate.animateFadeInDown}>ROADMAP
                    </motion.p>
                    <div className={'w-full sm:grid hidden items-center grid-cols-1 sm:grid-cols-2'}>
                        <div
                            className={'w-full py-20 h-full flex-wrap flex-col flex relative justify-start items-start'}>
                            <div className={'w-32 sm:w-60 h-full flex justify-center absolute top-0'}>
                                <div className={'w-4 sm:w-6 h-full rounded-t-full rounded-b-full bg-white'}>
                                </div>
                            </div>
                            {roadmap.map((item, counter) => {
                                return (
                                    <motion.div key={counter}
                                                className={'flex justify-center my-1 sm:my-10 items-center'}
                                                initial={'hidden'} whileInView={'visible'}
                                                viewport={{once: true}}
                                                transition={animate.transitionSecond}
                                                variants={animate.animateFadeInRight}>
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
                                        <p className={'font-player text-xs sm:text-2xl text-white'}>{item.title}:</p>
                                        <p className={'font-jost text-white text-xs sm:text-2xl leading-[100%]'}>{item.description}</p>
                                    </motion.div>

                                )

                            })}

                        </div>
                        <div className={'w-full py-20 flex-wrap flex-col flex relative justify-start items-start'}>
                            <div className={'w-32 sm:w-60 h-3/4 flex justify-center absolute top-0'}>
                                <div className={'w-4 sm:w-6 h-full rounded-t-full rounded-b-full bg-white'}>
                                </div>
                            </div>
                            {roadmap2.map((item, counter) => {
                                return (
                                    <motion.div key={counter}
                                                className={'flex justify-center my-1 sm:my-10 items-center'}
                                                initial={'hidden'} whileInView={'visible'}
                                                viewport={{once: true}}
                                                transition={animate.transitionSecond}
                                                variants={animate.animateFadeInRight}>
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
                                        <p className={'font-player text-xs sm:text-2xl text-white'}>{item.title}:</p>
                                        <p className={'font-jost text-white text-xs sm:text-2xl leading-[100%]'}>{item.description}</p>
                                    </motion.div>

                                )

                            })}

                        </div>
                    </div>

                    <div
                        className={'w-full py-20 h-full flex-wrap flex-col flex sm:hidden relative justify-start items-start'}>
                        <div className={'w-32 sm:w-60 h-full flex justify-center absolute top-0'}>
                            <div className={'w-4 sm:w-6 h-full rounded-t-full rounded-b-full bg-white'}>
                            </div>
                        </div>
                        {roadmapFull.map((item, counter) => {
                            return (
                                <motion.div key={counter}
                                            className={'flex justify-center my-1 sm:my-10 items-center'}
                                            initial={'hidden'} whileInView={'visible'}
                                            viewport={{once: true}}
                                            transition={animate.transitionSecond}
                                            variants={animate.animateFadeInRight}>
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
                                    <p className={'font-player text-xs sm:text-2xl text-white'}>{item.title}:</p>
                                    <p className={'font-jost text-white text-xs sm:text-2xl leading-[100%]'}>{item.description}</p>
                                </motion.div>

                            )

                        })}

                    </div>

                </div>


                {/*OUR COMMAND*/}

                <div className={'block py-10 w-full bg-black'} id={'team'}>
                    <motion.p className={'font-game text-white text-4xl sm:text-8xl text-center w-full py-10'}
                              initial={'hidden'}
                              whileInView={'visible'}
                              viewport={{once: true}}
                              transition={animate.transitionSecond}
                              variants={animate.animateFadeInDown}>OUR TEAM
                    </motion.p>
                    <div className={'w-full sm:px-60 flex justify-center items-center flex-wrap'}>
                        {team.map((item, counter) => {
                            return (
                                <div key={counter}
                                     className={'flex flex-col mb-5 flex-wrap mx-2 sm:mx-10 justify-center items-center'}>
                                    <motion.div
                                        className={'w-24 h-24 sm:w-72  sm:h-72 relative rounded-full bg-black flex justify-center items-center'}
                                        initial={'hidden'}
                                        whileInView={'visible'}
                                        viewport={{once: true}}
                                        transition={animate.transitionSecond}
                                        variants={animate.animateFadeInDown}>
                                        <div className={'w-full h-full absolute'}>
                                            <Image src={`/images/punks/${item.avatar}`} layout={'fill'}></Image>
                                        </div>
                                    </motion.div>
                                    <motion.p className={'text-white my-1 text-xs sm:text-xl uppercase font-player'}
                                              initial={'hidden'}
                                              whileInView={'visible'}
                                              viewport={{once: true}}
                                              transition={animate.transitionSecond}
                                              variants={animate.animateFadeInDown}>{item.name}</motion.p>
                                    <motion.p className={'text-white my-1 text-xs sm:text-2xl uppercase font-game'}
                                              initial={'hidden'}
                                              whileInView={'visible'}
                                              viewport={{once: true}}
                                              transition={animate.transitionSecond}
                                              variants={animate.animateFadeInDown}>{item.post}</motion.p>
                                </div>
                            )
                        })}
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
