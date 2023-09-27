import { ReactNode, createContext, useState, useReducer, useEffect } from "react";
import { cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptedCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finisheDate?: Date
}

export interface CycleState {
    cycles: Cycle[]
    activeCycleId: string | null
}

interface ContextCycle {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPast: number
    cycles: Cycle[]
    markCurrentCycleAsFinished: () => void
    setSecondsPasseds: (seconds: number) => void
    CreateNewCycle: (data: CreateCycleData) => void
    handleInterruptCycle: () => void
}

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface CycleContextProviderProps {
    children: ReactNode
}

export const CycleContext = createContext({} as ContextCycle)

export function CycleContextProvider({children}: CycleContextProviderProps) {

    const [cyclesStade, dispatch] = useReducer(cyclesReducer, {cycles: [], activeCycleId: null}, () => {
        const storedStateAsJASON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if(storedStateAsJASON){
            return JSON.parse(storedStateAsJASON)
        }
    })
    const [amountSecondsPast, setAmountSecondsPast] = useState(0)

    useEffect(() => {
        const stateJson = JSON.stringify(cyclesStade)
        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJson)
    }, [cyclesStade])

    const activeCycle = cyclesStade.cycles.find(cycle => cycle.id === cyclesStade.activeCycleId)

    const { cycles, activeCycleId } = cyclesStade

    function CreateNewCycle(data: CreateCycleData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        
        setAmountSecondsPast(0)
    }

    function markCurrentCycleAsFinished(){
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function handleInterruptCycle(){
        dispatch(interruptedCurrentCycleAction())
    }

    function setSecondsPasseds(seconds: number){
        setAmountSecondsPast(seconds)
    }

    return(
        <CycleContext.Provider
        value={{
            activeCycle,
            activeCycleId,
            amountSecondsPast,
            cycles,
            markCurrentCycleAsFinished,
            setSecondsPasseds,
            CreateNewCycle,
            handleInterruptCycle
        }}>
            {children}
        </CycleContext.Provider>
    )
}

        