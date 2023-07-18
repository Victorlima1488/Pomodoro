import { HeaderContainer } from "./StylesHeader";
import logoPomodoro from "../../assets/tomato-svgrepo-com.svg"
import { Timer, Scroll } from "phosphor-react";

// Importação do componente NavLink que ser ve para criar links de navegação entre diferentes rotas.
import { NavLink } from "react-router-dom";

export function Header(){
    return(
        <HeaderContainer>
            <img src={logoPomodoro} alt="" />
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>

                <NavLink to="/history" title="Histórico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}