// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";

// import Home from "../pages/Home/Home"
// import Favoritos from "../pages/Favoritos/Favoritos";
// import NotFound from "../pages/notFound/notFound";
// import Login from "../pages/Login";
// import Start from "../pages/Start";

// import Detalhes from "../pages/Detalhes/Detalhes"

// const router = createBrowserRouter([
//     {
//         path: "/MatchMovie/",
//         element: <Home/>,
//     },
//     {
//         path: "/MatchMovie/*",
//         element: <NotFound/>,
//     },
//     {
//         path: "/MatchMovie/favoritos",
//         element: <Favoritos/>,
//     },
//     {
//         path: "/MatchMovie/detalhes/:id",
//         element: <Detalhes/>,
//     },
// ]);

// const RouterApp = () =>{

//     const corSetada = localStorage?.getItem("@tema") ?? null
//     if (corSetada === 'escuro') {
//         document.documentElement.setAttribute("data-tema", "escuro")
//     } else if (corSetada === 'claro') {
//         document.documentElement.setAttribute("data-tema", "claro")
//     } else if (matchMedia('(prefers-color-scheme:dark)').matches) {
//         console.log(matchMedia('(prefers-color-scheme:dark)'))
//         document.documentElement.setAttribute("data-tema", "escuro");
//     }
    
//     return(
//         <div>
//             <RouterProvider router={router} />
//         </div>
//     )
// }


// export default RouterApp;

import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import Home from "../pages/Home/Home";
import Favoritos from "../pages/Favoritos/Favoritos";
import NotFound from "../pages/notFound/notFound";
import Login from "../pages/Login";
import Start from "../pages/Start";
import Detalhes from "../pages/Detalhes/Detalhes";

// Componente de rota privada
const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('email') && localStorage.getItem('senha');
    return isAuthenticated ? element : <Navigate to="/MatchMovie/login" />;
};

// Definição das rotas
const router = createBrowserRouter([
    {
        path: "/MatchMovie/",
        element: <Start />,
    },
    {
        path: "/MatchMovie/home",
        element: <Home />,
    },
    {
        path: "/MatchMovie/*",
        element: <NotFound />,
    },
    {
        path: "/MatchMovie/favoritos",
        element: <PrivateRoute element={<Favoritos />} />,
    },
    {
        path: "/MatchMovie/detalhes/:id",
        element: <Detalhes />,
    },
    {
        path: "/MatchMovie/login",
        element: <Login />,
    },
]);

// Componente principal com a lógica do tema
const RouterApp = () => {
    const corSetada = localStorage?.getItem("@tema") ?? null;
    if (corSetada === 'escuro') {
        document.documentElement.setAttribute("data-tema", "escuro");
    } else if (corSetada === 'claro') {
        document.documentElement.setAttribute("data-tema", "claro");
    } else if (matchMedia('(prefers-color-scheme:dark)').matches) {
        document.documentElement.setAttribute("data-tema", "escuro");
    }

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default RouterApp;
