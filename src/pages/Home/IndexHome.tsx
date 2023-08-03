// Importação da bíblioteca de icones para componentes React.
import { Play } from "phosphor-react"
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./IndexStyle";

// Importação de um hook personalizado que é ultilizado para gerenciamento de formulários.
import { useForm } from 'react-hook-form'

// Importação da biblioteca zod, que é integrada ao react-hook-form e serve para validação de formulários no react com base nos esquemas zod.
// Ela tem uma grande conectividade com o TypeScript.
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useEffect, useState } from "react"

import { differenceInSeconds } from 'date-fns'

// Aqui temos o esquema de validação do forms usando o zod para garantir que os valores inseridos nos campos 'task' e 'minutesAmount' atendem
// às regras estabelexidas antes de prosseguir com algum procedimento.
const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no mínimo 5 minutos.'),
})

type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
}

export function Home(){

    // Armazena os novos ciclos dentro do array cycles.
    const [cycles, setCycles] = useState<Cycle[]>([])

    // Armazena qual é o ciclo ativo naquele momento, e se tem algum ciclo ativo.
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPast, setAmountSecondsPast] = useState(0)

    // Desestruturação de funções nativas do hook useForm, sendo respectivamente a variável que armazena
    // o estado atual do componente, a função de alteração da variável de armazenamento e uma função que monitora
    // em tempo real o estado do componente que foi passasdo como parâmetro e  reset limpa os campos registrados.
    const {register, handleSubmit, watch, reset} = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }
    })

     // Faz o mapeamento e retorna qual o ciclo dentro do array cycles que está ativo.
     const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    useEffect(() => {
        if(activeCycle) {
            setInterval(() =>{
                setAmountSecondsPast(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }
    }, [activeCycle])

    // Função que inicia um novo ciclo e limpa os campos dos Inputs.
    function handleCreateNewCycle(data: newCycleFormData){
        const id = String(new Date().getTime())



        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(state => [...state, newCycle])
        setActiveCycleId(id)

        reset()
    }

    const TotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? TotalSeconds - amountSecondsPast : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

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

                        // O register registra o input no react hook form, permitindo que ele rastreie e gerencie as alterações feitas nesse campo.
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
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}