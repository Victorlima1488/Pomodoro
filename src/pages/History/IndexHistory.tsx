import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./Styles";
import { CycleContext } from "../../contexts/CycleContext";
import { tr } from "date-fns/locale";

export function History(){

    const { cycles } = useContext(CycleContext)

    return(
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                        {cycles.map(cycle => {
                            return(
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount}</td>
                                    <td>{cycle.startDate.toISOString()}</td>
                                    <td>
                                        {cycle.finisheDate && (
                                            <Status statusColor="green">Concluído</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red">Interrompido</Status>
                                        )}

                                        {(!cycle.interruptedDate && !cycle.finisheDate) && (
                                            <Status statusColor="yellow">Em andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    <tbody>
                        
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}