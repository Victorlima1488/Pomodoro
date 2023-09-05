// Importação da bíblioteca de icones para componentes React.
import { HandPalm, Play } from "phosphor-react"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./IndexStyle";
import { z } from 'zod'
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { CycleContext } from "../../contexts/CycleContext";

export function Home(){

    const { activeCycle, CreateNewCycle, handleInterruptCycle } = useContext(CycleContext)

    type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

    const newCycleFormValidationSchema = z.object({
        task: z.string().min(1, 'Informe a tarefa'),
        minutesAmount: z
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no mínimo 5 minutos.'),
    })

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm

    const task = watch('task')
    const isSubmitDisabled = !task

    function handleCreateNewCycle (data: newCycleFormData){
        CreateNewCycle(data)
        reset()
    }

    return(
                <HomeContainer>
                <form onSubmit={handleSubmit(handleCreateNewCycle)} >
                    
                    <FormProvider {...newCycleForm}> 
                        <NewCycleForm />
                    </FormProvider>

                    <Countdown />

                    {activeCycle ? (
                        <StopCountdownButton onClick={handleInterruptCycle} type="button">
                            <HandPalm size={24}/>
                            Interromper
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24}/>
                            Começar 
                        </StartCountdownButton>
                    )}
                </form>
            </HomeContainer>
    )
}