import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/IndexHeader";
import { LayoutContainer } from "./StylesLayout";

export function IndexLayout(){
    return(
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    )
}