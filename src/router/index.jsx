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
import GetVehicles from "@/pages/vehicles/GetVehicles.jsx";
import GetPostCategories from "@/pages/settings/post_categories/GetPostCategories.jsx";
import GetIncidentType from "@/pages/settings/incident_types/GetIncidentType.jsx";
import GetService from "@/pages/settings/service/GetService.jsx";
import DetailProfile from "@/pages/profiles/DetailProfile.jsx";
import FormUpdateProfile from "@/pages/profiles/FormUpdateProfile.jsx";
import FormCategories from "@/pages/settings/post_categories/FormCategories.jsx";
import FormIncidentType from "@/pages/settings/incident_types/FormIncidentType.jsx";
import FormService from "@/pages/settings/service/FormService.jsx";
import Index from "@/pages/home/Index.jsx";
import GetIncidents from "@/pages/incidents/GetIncident.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
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
                path: "services",
                element: <GetService />,
            },
            {
                path: "services/create",
                element: <FormService />,
            },
            {
                path: "services/edit/:id",
                element: <FormService />,
            },
            {
                path: "incidents",
                element: <GetIncidents />,
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
                path: "post_categories/create",
                element: <FormCategories />,
            },
            {
                path: "post_categories/edit/:id",
                element: <FormCategories />,
            },
            {
                path: "incident_types",
                element: <GetIncidentType />,
            },
            {
                path: "incident_types/create",
                element: <FormIncidentType />,
            },
            {
                path: "incident_types/edit/:id",
                element: <FormIncidentType />,
            },
            {
                path: "vehicles",
                element: <GetVehicles />,
            },
            {
                path: "profiles/:id",
                element: <DetailProfile />,
            },
            {
                path: "profiles/:id/update",
                element: <FormUpdateProfile />,
            },
            {
                path: "profiles/:id/change_password",
                element: <FormUpdateProfile />,
            },
            {
                path: "profiles/:id/danger",
                element: <FormUpdateProfile />,
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
