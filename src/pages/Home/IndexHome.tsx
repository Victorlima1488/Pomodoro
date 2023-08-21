// Importação da bíblioteca de icones para componentes React.
import { Activity, HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./IndexStyle";
import { z } from 'zod'
import { createContext, useState } from "react"
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
    markCurrentCycleAsFinished: () => void
}

export const ContextHome = createContext({} as ContextCycle)

export function Home(){

    // type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

    const newCycleFormValidationSchema = z.object({
        task: z.string().min(1, 'Informe a tarefa'),
        minutesAmount: z
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no mínimo 5 minutos.'),
    })

    // const {register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
    //     resolver: zodResolver(newCycleFormValidationSchema),
    //     defaultValues:{
    //         task: '',
    //         minutesAmount: 0,
    //     }
    // })

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    // function handleCreateNewCycle(data: newCycleFormData){
    //     const id = String(new Date().getTime())

    //     const newCycle: Cycle = {
    //         id,
    //         task: data.task,
    //         minutesAmount: data.minutesAmount,
    //         startDate: new Date(),
    //         interruptedDate: new Date(),
    //     }

    //     setCycles(state => [...state, newCycle])
    //     setActiveCycleId(id)
    //     setAmountSecondsPast(0)

    //     reset()
    // }

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

    // const task = watch('task')
    // const isSubmitDisabled = !task

    return(
            <ContextHome.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
                <HomeContainer>
                <form /* onSubmit={handleSubmit(handleCreateNewCycle)}*/ >
                    
                    {/* <NewCycleForm /> */}
                    <Countdown />

                    {activeCycle ? (
                        <StopCountdownButton onClick={handleInterruptCycle} type="button">
                            <HandPalm size={24}/>
                            Interromper
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
                            <Play size={24}/>
                            Começar
                        </StartCountdownButton>
                    )}
                </form>
            </HomeContainer>
            </ContextHome.Provider>
    )
}