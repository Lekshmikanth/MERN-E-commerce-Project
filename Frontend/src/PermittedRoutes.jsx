import React, { Suspense } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./module/routes";
import Loader from "./common/custom/loader/Loader";

const PermittedRoutes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={createHashRouter(routes)} />
            <Outlet />
        </Suspense>
    );
};

export default PermittedRoutes;
