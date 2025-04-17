import App from "../App";
import RootBoundary from "../common/custom/RootBoundary";
import { routes as productRoutes } from "../module/products/routes";
import AboutPage from "./about/AboutPage";
import AdminPage from "./admin/AdminPage";
import ContactUs from "./contact us/ContactUs";
import HomePage from "./HomePage";
import Login from "./login/Login";
import Products from "./products/Home";
import Register from "./register/Register";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

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
                icon: <HomeIcon />,
                element: <HomePage />,
                errorElement: <RootBoundary />
            },
            {
                title: "Admin",
                path: "/admin",
                icon: <AdminPanelSettingsIcon />,
                element: <AdminPage />,
                errorElement: <RootBoundary />
            },
            {
                title: "Products",
                path: "/",
                icon: <ShoppingBagIcon />,
                element: <Products />,
                children: productRoutes || [],
                errorElement: <RootBoundary />
            },
            {
                title: "About Us",
                path: "/about",
                icon: <InfoIcon />,
                element: <AboutPage />,
                errorElement: <RootBoundary />
            },
            {
                title: "Contact Us",
                path: "/contact-us",
                icon: <ContactMailIcon />,
                element: <ContactUs />,
                errorElement: <RootBoundary />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <RootBoundary />
    },
]
export { routes };