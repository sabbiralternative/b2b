import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AccountList from "../pages/Account/AcountList/AccountList";
import CreateAccount from "../pages/Account/CreateAccount/CreateAccount";
import MarketAnalysis from "../pages/MarketAnalysis/MarketAnalysis";
import MultiLoginAccount from "../pages/MultiLoginAccount/MultiLoginAccount";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/market-analysis",
          element: <MarketAnalysis />,
        },
        {
          path: "/multi-login-account",
          element: <MultiLoginAccount />,
        },
        {
          path: "/account-list",
          element: <AccountList />,
        },
        {
          path: "/create-account",
          element: <CreateAccount />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
