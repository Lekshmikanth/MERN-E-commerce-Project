import App from "../App";
import RootBoundary from "../common/custom/RootBoundary";
import { routes as productRoutes } from "../module/products/routes";
import AdminPage from "./admin/AdminPage";
import HomePage from "./HomePage";
import Login from "./login/Login";
import Products from "./products/Home";
import Register from "./register/Register";

const routes = [
    {
        path: "/login",
        element: <Login />,
        errorElement: <RootBoundary />
    },
    {
        path: "/",
        element: <App />,
        errorElement: <RootBoundary />,
        children: [
            {
                title: "Home",
                path: "/",
                element: <HomePage />,
                errorElement: <RootBoundary />
            },
            {
                title: "Admin",
                path: "/admin",
                element: <AdminPage />,
                errorElement: <RootBoundary />
            },
            {
                title: "Products",
                path: "/",
                element: <Products />,
                children: productRoutes || [],
                errorElement: <RootBoundary />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <RootBoundary />
    }
]
export { routes };