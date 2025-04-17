import { lazy } from "react";
import RootBoundary from "../../common/custom/RootBoundary";

const CategoryListing = lazy(() => import("./CategoryListing"));
const CategorywiseListing = lazy(() => import("./CategorywiseListing/CategorywiseListing"));

const routes = [
    {
        title: "Categories",
        path: "/products",
        element: <CategoryListing />,
        errorElement: <RootBoundary />
    },
    {
        path: "/products/:categoryName",
        element: <CategorywiseListing />
    }
]

export { routes };