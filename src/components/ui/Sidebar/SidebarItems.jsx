import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowSidebar } from "../../../redux/features/global/globalSlice";
import { menuData } from "../../../static/menuData";

const SidebarItems = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const closeSidebar = () => {
    dispatch(setShowSidebar(false));
  };

  const handleNavigate = (link) => {
    navigate(link);
    setActiveMenu(null);
    closeSidebar();
  };

  const handleToggleMenu = (id) => {
    if (activeMenu === id) {
      setActiveMenu(null);
    } else {
      setActiveMenu(id);
    }
  };

  return (
    <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link onClick={closeSidebar} to="/" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>
      <li className="menu-item">
        <Link
          onClick={closeSidebar}
          to="/market-analysis"
          className="menu-link"
        >
          <i className="menu-icon bx bxs-bar-chart-alt-2"></i>
          <div data-i18n="Dashboards">Market Analysis</div>
        </Link>
      </li>
      <li className="menu-item">
        <Link
          onClick={closeSidebar}
          to="/multi-login-account"
          className="menu-link"
        >
          <i className="menu-icon bx bx-user-plus"></i>
          <div data-i18n="Dashboards">Multi Login Account</div>
        </Link>
      </li>
      {menuData?.map((menu) => (
        <li
          onClick={() => handleToggleMenu(menu.id)}
          key={menu.id}
          className={`menu-item ${activeMenu === menu.id ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Clients">{menu.label}</div>
          </a>

          <ul className="menu-sub">
            {menu.submenu.map((item) => (
              <li key={item.path} className="menu-item">
                <a
                  onClick={() => handleNavigate(item.path)}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div>{item.label}</div>
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default SidebarItems;
