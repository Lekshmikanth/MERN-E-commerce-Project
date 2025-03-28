import InnerPage from "./shirts/InnerPage";
import NewPage from "./shirts/NewPage";
import OldPage from "./t-shirts/OldPage";

const routes = [
    {
        title: "Shirts",
        path: "shirts",
        children: [
            {
                path: "",
                element: <NewPage />
            },
            {
                title: "innerpage",
                path: "view",
                element: <InnerPage />
            }
        ]
    },
    {
        title: "T-Shirts",
        path: "t-shirts",
        element: <OldPage />
    }
]

export { routes };