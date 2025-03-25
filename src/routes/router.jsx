import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import AccountList from "../pages/Account/AcountList/AccountList";
import CreateAccount from "../pages/Account/CreateAccount/CreateAccount";
import MarketAnalysis from "../pages/MarketAnalysis/MarketAnalysis";
import MultiLoginAccount from "../pages/MultiLoginAccount/MultiLoginAccount";
import AccountStatement from "../pages/Reports/AccountStatement";
import GeneralLock from "../pages/Reports/GeneralLock";
import PartyWinLoss from "../pages/Reports/PartyWinLoss";
import TurnOver from "../pages/Reports/TurnOver";
import UserAuthentication from "../pages/Reports/UserAuthentication";
import LoginHistory from "../pages/Reports/LoginHistory";
import ChangePasswordHistory from "../pages/Reports/ChangePasswordHistory";
import AccountHistory from "../pages/Account/AcountHistory/AccountHistory";
import CurrentSportsBets from "../pages/Reports/CurrentSportsBets";
import CurrentCasinoBets from "../pages/Reports/CurrentCasinoBets";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

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
          path: "/account-history",
          element: <AccountHistory />,
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
          path: "/current-sports-bets",
          element: <CurrentSportsBets />,
        },
        {
          path: "/current-casino-bets",
          element: <CurrentCasinoBets />,
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
          path: "/login-history",
          element: <LoginHistory />,
        },
        {
          path: "/change-password-history",
          element: <ChangePasswordHistory />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
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
