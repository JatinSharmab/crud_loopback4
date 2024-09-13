import { lazy, Suspense, ReactElement, PropsWithChildren } from "react";
import {
  Outlet,
  RouteObject,
  RouterProps,
  createBrowserRouter,
} from "react-router-dom";
import PageLoader from "components/loading/PageLoader";
import Splash from "components/loading/Splash";
import Private from "guards/private";
import Public from "guards/public";
import { rootPaths, pagesRoutes } from "./paths";

const App = lazy(() => import("App"));
const MainLayout = lazy(() => import("layouts/main-layout"));
const Login = lazy(() => import("pages/authentication/Login"));
const SignUp = lazy(() => import("pages/authentication/SignUp"));
const MyProfile = lazy(() => import("pages/profile/MyProfile"));
const UpdateProfile = lazy(() => import("pages/profile/UpdateProfile"));
const ChangePassword = lazy(() => import("pages/profile/ChangePassword"));
const ListUsers = lazy(() => import("pages/projects_listing/user_data"));
const AddProjects = lazy(() => import("pages/projects_listing/add_projects"));
// import AddProjects from "pages/projects_listing/add_projects";
const UpdateProjects = lazy(() => import("pages/projects_listing/update_projects"));
const routes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <MainLayout>
              <Outlet />
            </MainLayout>
          </Suspense>
        ),
        children: [
          {
            element: <Private />,
            children: [
              {
                path: "/profile",
                element: (
                  <Suspense fallback={<Splash />}>
                    <MyProfile />
                  </Suspense>
                ),
              },
              {
                path: "/profile/update",
                element: (
                  <Suspense fallback={<Splash />}>
                    <UpdateProfile />
                  </Suspense>
                ),
              },
              {
                path: "/profile/ChangePassword",
                element: (
                  <Suspense fallback={<Splash />}>
                    <ChangePassword />
                  </Suspense>
                ),
              },
              {
                path: "/projects",
                element: (
                  <Suspense fallback={<Splash />}>
                    <ListUsers />
                  </Suspense>
                ),
              },
              {
                path: "/projects/add_projects",
                element: (
                  <Suspense fallback={<Splash />}>
                    <AddProjects />
                  </Suspense>
                ),
              },
              {
                path:"/projects/update_projects/:projectId",
                element: 
                  <Suspense fallback={<Splash />}>
                    <UpdateProjects/>
                  </Suspense>
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <Public />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Splash />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: pagesRoutes.signup,
        element: (
          <Suspense fallback={<Splash />}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },
];

const options: { basename: string } = {
  basename: "/",
};

const router: Partial<RouterProps> = createBrowserRouter(routes, options);
export default router;
