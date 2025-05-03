/* eslint-disable no-unused-vars */
import {
  Route,
  RouterProvider,
  createRootRoute,
  createRouter,
  createRoute,
} from "@tanstack/react-router";
import { UserLayout } from "../components/layouts/UserLayout";
import { Homepage } from "../components/pages/Homepage";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { Login } from "../components/pages/ADMIN/Login";
import ProtectedRoute from "../utils/ProtectedRoute";
import { Dashboard } from "../components/pages/ADMIN/Dashboard";
import { Apps } from "../components/pages/ADMIN/Apps";
import { Users } from "../components/pages/ADMIN/Users";

const rootRoute = createRootRoute();

// LAYOUTING ROUTE
const adminLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "adminLayout",
  component: AdminLayout,
});

const userLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "userLayout",
  component: UserLayout,
});
// ROTES ADMIN
const dashboard = createRoute({
  getParentRoute: () => adminLayout,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});
const apps = createRoute({
  getParentRoute: () => adminLayout,
  path: "/apps",
  component: () => (
    <ProtectedRoute>
      <Apps />
    </ProtectedRoute>
  ),
});
const users = createRoute({
  getParentRoute: () => adminLayout,
  path: "/users",
  component: () => (
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  ),
});
const login = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => <Login />,
});

// ROUTES USER
const homePage = createRoute({
  getParentRoute: () => userLayout,
  path: "/",
  component: () => <Homepage />,
});

// export
const routes = rootRoute.addChildren([
  userLayout.addChildren([homePage]),
  adminLayout.addChildren([dashboard, apps, users]),
  login,
]);

export const router = createRouter({
  routeTree: routes,
});
