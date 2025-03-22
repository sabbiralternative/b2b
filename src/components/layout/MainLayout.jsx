import { Outlet, useNavigate } from "react-router-dom";
import { handleLogOut } from "../../utils/handleLogOut";
import { Settings } from "../../api";
import { useEffect } from "react";
import disableDevtool from "disable-devtool";
import Footer from "../ui/Footer/Footer";
import { useSelector } from "react-redux";
import Header from "../ui/Header/Header";
import Sidebar from "../ui/Sidebar/Sidebar";
import Navbar from "../ui/Navbar/Navbar";

const MainLayout = () => {
  const navigate = useNavigate();
  const disabledDevtool = Settings.disabledDevtool;
  const { showSidebar } = useSelector((state) => state.global);

  /* Disabled devtool based on settings */
  useEffect(() => {
    if (disabledDevtool) {
      disableDevtool({
        ondevtoolopen: (type) => {
          const info = "devtool opened!; type =" + type;
          if (info) {
            handleLogOut();
            navigate("/login");
          }
        },
      });
    }
  }, [navigate, disabledDevtool]);

  return (
    <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
      <div className="layout-container">
        <Header />

        <div className="layout-page">
          <div className="content-wrapper">
            {showSidebar ? <Sidebar /> : <Navbar />}

            <Outlet />

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
