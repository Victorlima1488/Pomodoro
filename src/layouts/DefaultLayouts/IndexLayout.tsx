import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/IndexHeader";
import { LayoutContainer } from "./StylesLayout";

export function IndexLayout(){
    return(
        <LayoutContainer>
            <Header />

            {/* Esse componente é o responsável pela obter dentro dele a renderização dos componetnes que houver mudanças de rotas. */}
            <Outlet />
        </LayoutContainer>
    )
}