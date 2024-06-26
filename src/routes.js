import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//pages
import {
  AddUser,
  Dashboard,
  ForgotPassword,
  Login,
  Page404,
  Profile,
  Register,
  Settings,
  Users,
} from "./pages";
import Products from "./pages/Products/products";
import AddProduct from "./pages/Products/AddProduct";
import AdminOrder from "./pages/AdminOrder/AdminOrder";
import SellerOrder from "./pages/SellerOrder/SellerOrder";
import DetailProduct from "./pages/Products/detailProduct";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "users", element: <Users /> },
        { path: "users/add-user", element: <AddUser /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        { path: "products", element: <Products /> },
        { path: "products/add-product", element: <AddProduct /> },
        { path: "products/detail-product/:id", element: <DetailProduct /> },
        { path: "admin-order", element: <AdminOrder /> },
        { path: "seller-order", element: <SellerOrder /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
