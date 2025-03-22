import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AccountList from "../pages/Account/AcountList/AccountList";
import CreateAccount from "../pages/Account/CreateAccount/CreateAccount";
import MarketAnalysis from "../pages/MarketAnalysis/MarketAnalysis";
import MultiLoginAccount from "../pages/MultiLoginAccount/MultiLoginAccount";
import AccountStatement from "../pages/Reports/AccountStatement";
import CurrentBets from "../pages/Reports/CurrentBets";
import GeneralLock from "../pages/Reports/GeneralLock";
import PartyWinLoss from "../pages/Reports/PartyWinLoss";
import TurnOver from "../pages/Reports/TurnOver";
import UserAuthentication from "../pages/Reports/UserAuthentication";
import UserHistory from "../pages/Reports/UserHistory";

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
        {
          path: "/account-statement",
          element: <AccountStatement />,
        },
        {
          path: "/current-bets",
          element: <CurrentBets />,
        },
        {
          path: "/general-lock",
          element: <GeneralLock />,
        },
        {
          path: "/party-win-loss",
          element: <PartyWinLoss />,
        },
        {
          path: "/turn-over",
          element: <TurnOver />,
        },
        {
          path: "/user-authentication",
          element: <UserAuthentication />,
        },
        {
          path: "/user-history",
          element: <UserHistory />,
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
