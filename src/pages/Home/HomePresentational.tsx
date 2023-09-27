import { FormProvider, UseFormReturn } from "react-hook-form"
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./Home.styled"
import { NewCycleForm } from "./componentsHome/NewCycleForm"
import { Countdown } from "./componentsHome/Countdown"
import { HandPalm, Play } from "phosphor-react"
import { Cycle } from "../../contexts/CycleContext"
import { newCycleFormData } from "./Home"

interface PropsHome {
    activeCycle: Cycle | undefined;
    handleInterruptCycle: () => void;
    handleSubmit: <TFormValues>(onSubmit: (data: TFormValues) => void, onError?: ((errors: any) => void) | undefined) => (e: React.FormEvent<Element>) => void
    handleCreateNewCycle: () => void;
    newCycleForm: UseFormReturn<newCycleFormData>;
    isSubmitDisabled: boolean;
}

export function HomePresentational({ isSubmitDisabled, activeCycle, newCycleForm, handleCreateNewCycle, handleInterruptCycle, handleSubmit }: PropsHome){
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