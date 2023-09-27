import styled from "styled-components"

export const HomeContainer = styled.main`
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
const BaseButtonsStyle = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.5s;

    cursor: pointer;

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`
export const StartCountdownButton = styled(BaseButtonsStyle)`
    background: ${props => props.theme['gray-500']};
    color: ${props => props.theme['gray-100']};

    &:not(:disabled):hover{
        background: ${props => props.theme['gray-400']};
    }
`

export const StopCountdownButton = styled(BaseButtonsStyle)`
    background: ${props => props.theme['red-500']};
    color: ${props => props.theme['gray-100']};

    &:not(:disabled):hover{
        background: ${props => props.theme['red-700']};
    }
`