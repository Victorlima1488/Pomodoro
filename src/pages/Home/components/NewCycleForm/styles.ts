import styled from "styled-components";

const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: bold;

    // O valor inherit faz com que o componente herde o determinado valor do seu pai, nesse caso o font-size.
    font-size: inherit;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};
    transition: all.4s;

    &::placeholder{
        color: ${props => props.theme['gray-500']};
    }

    &:focus{
        box-shadow: none;
        border-color: ${props => props.theme['red-500']};
    }
`
// Passando o BaseInput por parâmetro no componente TaskInput, ele automáticamente herda todas as configurações do BaseInput.
export const TaskInput = styled(BaseInput)`
    flex: 1;

    // Tira a setinha de quando você usa o datalist, para mostrar as sugestões no input.
    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`

