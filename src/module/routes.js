import App from "../App";
import {routes as categoryRoutes} from "../module/category/routes";
import Category from "./category/Home";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                title: "Category",
                path: "category",
                element: <Category />,
                children: categoryRoutes || []
            }
        ]
    }
]
export {routes};