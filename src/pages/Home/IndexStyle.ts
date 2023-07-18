import styled from "styled-components"

export const HomeContainer = styled.main`

    // Flex 1 é a forma abreviada de definir três pripriedades relacionadas: flex-grow, flex-shrink, flex-basis. 
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`
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

export const CountdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${props => props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span{
        background: ${props => props.theme['gray-700']};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme['red-700']};

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`

export const StartCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    background: ${props => props.theme['red-500']};
    color: ${props => props.theme['gray-100']};
    transition: all.5s;

    // Estabelece uma condição onde se o botão não estiver desabilitado "&:not(:disabled)", será adicionado o hover a ele.
    &:not(:disabled):hover{
        background: ${props => props.theme['red-700']};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }

`