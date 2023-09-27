import { produce } from 'immer'
import { CycleState } from '../../contexts/CycleContext'
import { ActionTypes } from './actions'

export function cyclesReducer(state: CycleState, action: any){
    switch(action.type){
        case ActionTypes.ADD_NEW_CYCLE:
            return produce(state, (draft) => {
                draft.cycles.push(action.payload.newCycle)
                draft.activeCycleId = action.payload.newCycle.id
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            const currentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if(currentCycleIndex < 0){
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
            })
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            const markCurrentCycleIndex = state.cycles.findIndex((cycle) => {
                return cycle.id === state.activeCycleId
            })

            if(markCurrentCycleIndex < 0){
                return state
            }
            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[markCurrentCycleIndex].finisheDate = new Date()
            })
        default:
            return state
    }
}