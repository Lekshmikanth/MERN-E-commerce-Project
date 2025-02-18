import App from "../App";
import RootBoundary from "../common/custom/RootBoundary";
import {routes as categoryRoutes} from "../module/category/routes";
import Category from "./category/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <RootBoundary />,
        children: [
            {
                title: "Category",
                path: "category",
                element: <Category />,
                children: categoryRoutes || [],
                errorElement: <RootBoundary />
            }
        ]
    }
]
export {routes};