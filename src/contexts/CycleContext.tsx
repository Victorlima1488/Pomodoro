import { ReactNode, createContext, useState } from "react";

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finisheDate?: Date
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

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPast, setAmountSecondsPast] = useState(0)
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished(){
        setCycles( (state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, finisheDate: new Date()}
                }else{
                    return cycle
                }
            })
        )
    }

    function setSecondsPasseds(seconds: number){
        setAmountSecondsPast(seconds)
    }

    function CreateNewCycle(data: CreateCycleData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
            interruptedDate: new Date(),
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPast(0)
    }

    function handleInterruptCycle(){
        setCycles((state) =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date()}
                }else{
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
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