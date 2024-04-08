import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import HomePage from "../pages/HomePage";
import { WebShopPage } from "../pages/WebShopPage";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [ 
            {
                path: "/",
                element: <HomePage />,
                index: true,
            },
            {
                path: "/webshop",
                element: <WebShopPage />
            }

        ]
    }

])