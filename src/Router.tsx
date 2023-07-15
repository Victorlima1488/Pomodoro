import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { History } from "./pages/History"
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