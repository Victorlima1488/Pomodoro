import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home/IndexHome"
import { History } from "./pages/History/IndexHistory"
import { IndexLayout } from "./layouts/DefaultLayouts/IndexLayout"

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<IndexLayout />}>
                <Route path="/" element={<Home/>}/>
                <Route path="/history" element={<History/>}/>
            </Route>
        </Routes>
    )
}