// Importação da bíblioteca de icones para componentes React.
import { Play } from "phosphor-react"; 
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./IndexStyle";

// Importação de um hook personalizado que é ultilizado para gerenciamneto de dormulários.
import { useForm } from 'react-hook-form'

export function Home(){

    // desestruturação de funções nativas do hook useForm, sendo respectivamente a variável que armazena
    // o estado atual do componente, a função de alteração da variável de armazenamento e uma função que monitora
    // em tempo real o estado do componente que foi passasdo como parâmetro.
    const {register, handleSubmit, watch} = useForm()

    function handleCreateNewCycle(data: any){
        console.log(data)
    }

    // monitoramento do componente TaskInput para validação do disabled no butão de submit do form.
    const task = watch('task')
    const isSubmitDisabled = !task

    return(
        <HomeContainer>

            {/* Chamando a função através do evento de submit. Ela chama a função de alteração da variável de eestado*/}
            {/* e passa como parâmetro... */}
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome ao seu projeto"

                        // Dá sugestões no input com base no que é passado nas options da tag datalist.
                        list="task-suggestions"
                        {...register('task')}
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
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />
                    <span>minutos.</span>
                </FormContainer>
                
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}