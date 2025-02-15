import React, { Suspense } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./module/routes";


const PermittedRoutes = () => {
    return (
        <Suspense fallback={<h1>...Loading</h1>}>
            <RouterProvider router={createHashRouter(routes)} />
            <Outlet />
        </Suspense>
    );
};

export default PermittedRoutes;
