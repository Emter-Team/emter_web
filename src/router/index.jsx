import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import DefaultLayout from "@/layouts/DefaultLayout.jsx";
import GuestLayout from "@/layouts/GuestLayout.jsx";
import GetResident from "@/pages/residents/GetResident.jsx";
import GetOfficer from "@/pages/officers/GetOfficer.jsx";
import GetInstitution from "@/pages/institutions/GetInstitution.jsx";
import DetailResident from "@/pages/residents/DetailResident.jsx";
import DetailOfficer from "@/pages/officers/DetailOfficer.jsx";
import DetailInstitution from "@/pages/institutions/DetailInstitution.jsx";
import GetPost from "@/pages/posts/GetPost.jsx";
import DetailPost from "@/pages/posts/DetailPost.jsx";
import GetPostCategories from "@/pages/post_categories/GetPostCategories.jsx";
import GetVehicles from "@/pages/vehicles/GetVehicles.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "residents",
                element: <GetResident />,
            },
            {
                path: "residents/:id",
                element: <DetailResident />,
            },
            {
                path: "officers",
                element: <GetOfficer />,
            },
            {
                path: "officers/:id",
                element: <DetailOfficer />,
            },
            {
                path: "institutions",
                element: <GetInstitution />,
            },
            {
                path: "institutions/:id",
                element: <DetailInstitution />,
            },
            {
                path: "posts",
                element: <GetPost />,
            },
            {
                path: "posts/:id",
                element: <DetailPost />,
            },
            {
                path: "post_categories",
                element: <GetPostCategories />,
            },
            {
                path: "vehicles",
                element: <GetVehicles />,
            },
        ],
    },
    {
        path: "/auth/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
