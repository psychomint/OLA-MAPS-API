import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css'
import Planner from "./pages/Planner";
import Header from "./components/Header";
import Home from "./pages/Home";
import Maps from "./components/Maps";
import About from "./components/About";
import Contact from "./components/Contact";


const AppLayout = () => {
    return(
        <div className="root">
            <Header/>
            <Outlet/>
        </div>
    )
}

const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout/>,
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/planner",
                element:<Planner/>
            },
            {
                path:"/maps",
                element: <Maps/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"contact",
                element:<Contact/>
            }
        ]

    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router = {appRouter}/>);