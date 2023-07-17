import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav{
        display: flex;
        gap: .5rem;
        a{
            width: 3rem;
            height: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            color: ${props => props.theme['gray-100']};

            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;

            transition: all.5s;

            &:hover{
                border-bottom: 3px solid ${props => props.theme['red-500']};
            }

            &.active{
                color: ${props => props.theme['red-500']};
            }
        }
    }

    img{
        width: 2.5rem;
        height: 2..5rem;
    }
`