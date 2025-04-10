import Login from "./pages/auth/login.jsx";
import Layout from "./components/auth/layout";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register.jsx";
import AdminLayout from "./components/admin-view/AdminLayout.jsx";
import Dashboard from "./pages/admin-view/Dashboard.jsx";
import Features from "./pages/admin-view/Features.jsx";
import Orders from "./pages/admin-view/Orders.jsx";
import Products from "./pages/admin-view/Products.jsx";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout.jsx";
import PageNotFound from "./pages/NotFound/PageNotFound.jsx";
import Home from "./pages/shoppping-view/Home.jsx";
import List from "./pages/shoppping-view/List.jsx";
import Account from "./pages/shoppping-view/Account.jsx";
import CheckOut from "./pages/shoppping-view/CheckOut.jsx";
import CheckAuth from "./components/common/CheckAuth.jsx";
import Index from "./pages/unauth-page/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAUth } from "./store/auth-slice/index.js";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shoppping-view/pyapal-return.jsx";
import PayemntSuccessPage from "./pages/shoppping-view/payment-success.jsx";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAUth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="features" element={<Features />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="products" element={<Products />}></Route>
      </Route>
      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<Home />}></Route>
        <Route path="list" element={<List />}></Route>
        <Route path="account" element={<Account />}></Route>
        <Route path="checkout" element={<CheckOut />}></Route>
        <Route path="paypal-return" element={<PaypalReturnPage />} />
        <Route path="payment-success" element={<PayemntSuccessPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />}></Route>
      <Route path="/unauth-page" element={<Index />}></Route>
    </Routes>
  );
}

export default App;
