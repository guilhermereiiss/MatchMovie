
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


import Home from "../pages/Home/Home"
import Favoritos from "../pages/Favoritos/Favoritos";
import NotFound from "../pages/notFound/notFound";
import Recomendados from "../pages/Recomendados/Recomendados";

const router = createBrowserRouter([
    {
        path: "/MatchMovie/",
        element: <Home/>,
    },
    {
        path: "/MatchMovie/*",
        element: <NotFound/>,
    },
    {
        path: "/MatchMovie/favoritos",
        element: <Favoritos/>,
    },
    {
        path: "/MatchMovie/recomendados",
        element: <Recomendados/>,
    },
]);

const RouterApp = () =>{

    const corSetada = localStorage?.getItem("@tema") ?? null
    if (corSetada === 'escuro') {
        document.documentElement.setAttribute("data-tema", "escuro")
    } else if (corSetada === 'claro') {
        document.documentElement.setAttribute("data-tema", "claro")
    } else if (matchMedia('(prefers-color-scheme:dark)').matches) {
        console.log(matchMedia('(prefers-color-scheme:dark)'))
        document.documentElement.setAttribute("data-tema", "escuro");
    }
    
    return(
        <div>
            <RouterProvider router={router} />
        </div>
    )
}


export default RouterApp;