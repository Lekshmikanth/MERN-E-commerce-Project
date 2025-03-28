import App from "../App";
import RootBoundary from "../common/custom/RootBoundary";
import { routes as productRoutes } from "../module/products/routes";
import Products from "./products/Home";
import Login from "./register/login/components/Login";

const routes = [
    {
        path: "/login",
        element:
            // <PrivateRoute>
            // <Navigate>
            <Login />,
        // </Navigate>,
        //  </PrivateRoute>,
        errorElement: <RootBoundary />
    },
    {
        path: "/",
        element: <App />,
        errorElement: <RootBoundary />,
        children: [
            {
                title: "Products",
                path: "products",
                element: <Products />,
                children: productRoutes || [],
                errorElement: <RootBoundary />
            }
        ]
    }
]
export { routes };