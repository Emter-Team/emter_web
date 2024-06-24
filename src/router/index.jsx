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
