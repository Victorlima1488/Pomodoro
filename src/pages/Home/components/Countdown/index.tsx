import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'
import { ContextHome } from '../../IndexHome'
import { differenceInSeconds } from 'date-fns'

export function Countdown(){

    const { activeCycle, activeCycleId, markCurrentCycleAsFinished } = useContext(ContextHome)
    const [amountSecondsPast, setAmountSecondsPast] = useState(0)

    const TotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? TotalSeconds - amountSecondsPast : 0
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        let interval: number

        if(activeCycle) {
            interval = setInterval(() =>{
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
                
                if(secondsDifference >= TotalSeconds){
                    markCurrentCycleAsFinished()
                    clearInterval(interval)
                    setAmountSecondsPast(TotalSeconds)
                }else{
                    setAmountSecondsPast(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, TotalSeconds, activeCycleId])

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds])
    
    return(
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}