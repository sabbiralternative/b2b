export const menuData = [
  {
    label: "Account",
    icon: "bx bx-layout",
    id: "account",
    submenu: [
      { label: "Account List", path: "/account-list" },
      { label: "Create Account", path: "/create-account" },
    ],
  },
  {
    label: "Reports",
    icon: "bx bx-layout",
    id: "reports",
    submenu: [
      { label: "Account Statement", path: "/account-statement" },
      { label: "Party Win Loss", path: "/party-win-loss" },
      { label: "Current Bets", path: "/current-bets" },
      { label: "Login History", path: "/login-history" },
      { label: "Change Password History", path: "/change-password-history" },
      { label: "General Lock", path: "/general-lock" },
      { label: "Turn Over", path: "/turn-over" },
      { label: "User Authentication", path: "/user-authentication" },
    ],
  },
];
