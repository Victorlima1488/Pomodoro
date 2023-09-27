// Importação da bíblioteca de icones para componentes React.
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { CycleContext } from "../../contexts/CycleContext";
import { HomePresentational } from "./HomePresentational";

export type newCycleFormData = z.infer<typeof newCycleFormValidationSchema>

const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 2 minutos.')
    .max(60, 'O ciclo só pode ser de no máximo 60 minutos.'),
})

export function Home(){

    const { activeCycle, CreateNewCycle, handleInterruptCycle } = useContext(CycleContext)

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
        <HomePresentational isSubmitDisabled={isSubmitDisabled} activeCycle={activeCycle} newCycleForm={newCycleForm} handleCreateNewCycle={handleCreateNewCycle} handleInterruptCycle={handleInterruptCycle} handleSubmit={handleSubmit}/>
    )
}