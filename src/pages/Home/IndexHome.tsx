// Importação da bíblioteca de icones para componentes React.
import { Play } from "phosphor-react"; 
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./IndexStyle";

// Importação de um hook personalizado que é ultilizado para gerenciamneto de formulários.
import { useForm } from 'react-hook-form'

// Importação da biblioteca zod, que é integrada ao react-hook-form e serve para validação de formulários no react com base nos esquemas zod.
// Ela tem uma grande conectividade com o TypeScript.
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

// Aqui temos o esquema de validação do forms usando o zod para garantir que os valores inseridos nos campos 'task' e 'minutesAmount' atendem
// às regras estabelexidas antes de prosseguir com algum procedimento.
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no mínimo 5 minutos.'),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

    // Desestruturação de funções nativas do hook useForm, sendo respectivamente a variável que armazena
    // o estado atual do componente, a função de alteração da variável de armazenamento e uma função que monitora
    // em tempo real o estado do componente que foi passasdo como parâmetro.
    const {register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }
    })

    function handleCreateNewCycle(data: newCycleFormData){
        console.log(data)
        reset()
    }

    // Monitoramento do componente TaskInput para validação do disabled no butão de submit do form.
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
                        // max={60} 
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