import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    useEffect(()=>{
        start();
    },[])

    return (
        <div className={'flex flex-wrap justify-center text-center'}>
            <p className={'text-white font-player'}>Time to left:</p>
            <p className={'font-player  text-sm text-white'}>{days} days {hours} hours {minutes} minutes</p>
        </div>
    );
}

