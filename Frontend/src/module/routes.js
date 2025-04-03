import App from "../App";
import RootBoundary from "../common/custom/RootBoundary";
import { routes as productRoutes } from "../module/products/routes";
import AdminPage from "./admin/AdminPage";
import Login from "./login/Login";
import Products from "./products/Home";

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
                title: "Admin",
                path: "/admin",
                element: <AdminPage />,
                errorElement: <RootBoundary />,
            },
            {
                title: "Products",
                path: "/products",
                element: <Products />,
                children: productRoutes || [],
                errorElement: <RootBoundary />
            }
        ]
    }
]
export { routes };