import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.css"
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Homepage from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import CompanyJobs from "./components/admin/CompanyJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";
import PrivateAdminRoute from "./components/admin/PrivateAdminRoute";
import About from "./components/About";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
  path: "/about",
  element: <About />
},
  //admin site starts here
  {
    path: "/admin/companies",
    element: (
      <PrivateAdminRoute>
        <Companies />
      </PrivateAdminRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <PrivateAdminRoute>
        {" "}
        <CompanyCreate />
      </PrivateAdminRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <PrivateAdminRoute>
        <CompanySetup />
      </PrivateAdminRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <PrivateAdminRoute>
        <CompanyJobs />
      </PrivateAdminRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <PrivateAdminRoute>
        <PostJobs />
      </PrivateAdminRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <PrivateAdminRoute>
        <Applicants />
      </PrivateAdminRoute>
    ),
  },
  
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
