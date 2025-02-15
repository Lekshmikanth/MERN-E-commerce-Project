import InnerPage from "./new/InnerPage";
import NewPage from "./new/NewPage";
import OldPage from "./old/OldPage";

const routes = [
    {
    title: "new",
    path: "new",
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
    title: "old",
    path: "old",
    element: <OldPage />
}
]

export {routes};