import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { menuData } from "../../../static/menuData";

const Master = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(link);
    setActiveMenu(null);
  };

  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link to="/" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>
      <li className="menu-item">
        <Link to="/market-analysis" className="menu-link">
          <i className="menu-icon bx bxs-bar-chart-alt-2"></i>
          <div data-i18n="Dashboards">Market Analysis</div>
        </Link>
      </li>
      <li className="menu-item">
        <Link to="/multi-login-account" className="menu-link">
          <i className="menu-icon bx bx-user-plus"></i>
          <div data-i18n="Dashboards">Multi Login Account</div>
        </Link>
      </li>

      {menuData.map((menu) => (
        <li
          onMouseEnter={() => setActiveMenu(menu.id)}
          onMouseLeave={() => setActiveMenu(null)}
          key={menu.id}
          className={`menu-item ${activeMenu === menu.id ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className={`menu-icon tf-icons ${menu.icon}`}></i>
            <div data-i18n={menu.label}>{menu.label}</div>
          </a>

          <ul className="menu-sub">
            {menu.submenu.map((item) => (
              <li key={item.path} className="menu-item">
                <a
                  onClick={() => handleNavigate(item.path)}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n={item.label}>{item.label}</div>
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default Master;
