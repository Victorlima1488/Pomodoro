import { useContext } from "react";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { ContextHome } from "../../IndexHome";

export function NewCycleForm(){

    const { activeCycle } = useContext(ContextHome)
    
    return(
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome ao seu projeto"

                        // Dá sugestões no input com base no que é passado nas options da tag datalist.
                        list="task-suggestions"

                        // O register registra o input no react hook form, permitindo que ele rastreie e gerencie as alterações feitas nesse campo.
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

                        // O atributo step significa que o valor o input do tipo número vai pular de 5 em 5.
                        step={5}
                        min={1}
                        max={60} 
                        {...register('minutesAmount', {valueAsNumber: true})}
                        disabled={!!activeCycle}
                    />
                    <span>minutos.</span>
                </FormContainer>
    )
}