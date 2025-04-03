import { lazy } from "react";

const CategorywiseListing = lazy(() => import("./CategorywiseListing/CategorywiseListing"));

const routes = [
    {
        title: "Appliances",
        path: "appliances",
        element: <CategorywiseListing />
    },
    {
        title: "Electronics",
        path: "electronics",
        element: <CategorywiseListing />
    },
    {
        title: "Mobiles",
        path: "mobiles",
        element: <CategorywiseListing />
    }
]

export { routes };