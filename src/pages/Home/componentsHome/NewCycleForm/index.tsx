import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../contexts/CycleContext";

export function NewCycleForm(){

    const { activeCycle } = useContext(CycleContext)
    const { register } = useFormContext()
    
    return(
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome ao seu projeto"
                        list="task-suggestions"
                        {...register('task')}
                        disabled={!!activeCycle}
                    />

                    <datalist id="task-suggestions">
                        <option value="projeto 1" />
                        <option value="projeto 2" />
                        <option value="projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={1}
                        min={1}
                        max={60} 
                        {...register('minutesAmount', {valueAsNumber: true})}
                        disabled={!!activeCycle}
                    />
                    <span>minutos.</span>
                </FormContainer>
    )
}