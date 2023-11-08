import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import DoctorDashboard from "../../features/doctors/dashboard/DoctorDashboard";
import DoctorDetails from "../../features/doctors/details/DoctorDetails";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import AppointmentDashboard from "../../features/appointments/AppointmentDashboard";
import RequireAuth from "./RequireAuth";
import FavoriteDashboard from "../../features/favorites/FavoriteDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
            {path: '/errors', element: <TestErrors />},
            {path: '/favorites/:username', element: <FavoriteDashboard />},
            {path: '/appointments/:username', element: <AppointmentDashboard />}
            ]},
            {path: '/doctors', element: <DoctorDashboard />},
            {path: '/doctors/:id', element: <DoctorDetails />},
            {path: '/not-found', element: <NotFound />},
            {path: '/server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found'/>}

        ]
    }

];

export const router = createBrowserRouter(routes);