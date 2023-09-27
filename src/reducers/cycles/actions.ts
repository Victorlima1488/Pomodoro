import { Cycle } from "../../contexts/CycleContext";

export enum ActionTypes {
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle){
    return(
        {
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle,
            },
        }
    )
}

export function markCurrentCycleAsFinishedAction(){
    return(
        {
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
        }
    )
}

export function interruptedCurrentCycleAction(){
    return(
        {
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
        }
    )
}