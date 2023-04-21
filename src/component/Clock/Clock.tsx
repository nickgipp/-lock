import { useEffect, useState } from 'react';
import { useTimer } from '../../hooks/useTimer';
import './Clock.css';
import { getTimeIp } from '../../api';

export const Clock = () => {
    const [tick, setTick] = useTimer(0)
    const [error, setError] = useState(false)
    const [timeZone, setTimeZone] = useState('')
    useEffect(() => {
        const getTime = async () => {
            try {
                const res = await getTimeIp()
                const resJson = await res.json()
                setTick(resJson.unixtime * 1000)
                setTimeZone(resJson.timezone)
            } catch (error) {
                console.log(error)
                setError(true)
            }

        }
        getTime()
    }, [setTick])

    if (error) {
        return <div>Ошбика при получении времени</div>
    }

    return (
        <div className='wClock'>
            <div className='timezone'>
                Timezone: {timeZone}
            </div>
            <div className='clock'>
                <div className='center' />
                <div className='hand secondHand' style={{ transform: `rotate(${new Date(tick).getSeconds() * 360 / 60}deg)` }} />
                <div className='hand minuteHand' style={{ transform: `rotate(${new Date(tick).getMinutes() * 360 / 60}deg)` }} />
                <div className='hand hourHand' style={{ transform: `rotate(${new Date(tick).getHours() * 360 / 12}deg)` }} />
            </div>
        </div>

    );
}