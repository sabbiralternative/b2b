import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const Master = () => {
  const [showClients, setShowClients] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const navigate = useNavigate();

  const clientsRef = useRef();
  useCloseModalClickOutside(clientsRef, () => {
    setShowClients(false);
  });

  const paymentsRef = useRef();
  useCloseModalClickOutside(paymentsRef, () => {
    setShowPayments(false);
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowClients(false);
    setShowPayments(false);
  };

  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link tp="/" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>

      <li ref={clientsRef} className={`menu-item ${showClients ? "open" : ""}`}>
        <a
          onMouseEnter={() => {
            setShowClients(true);
            setShowPayments(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Clients">Clients</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("view-client")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="View Clients">View Clients</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("add-client")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="Add Client">Add Client</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("clients-with-balance")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="Add Client">Clients with balance</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("all-client")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="Add Client">All Clients</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("active-client")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="Add Client">Active Clients</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("inactive-client")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-user"></i>
              <div data-i18n="Add Client">Inactive Clients</div>
            </a>
          </li>
        </ul>
      </li>

      <li
        ref={paymentsRef}
        className={`menu-item ${showPayments ? "open" : ""}`}
      >
        <a
          onMouseEnter={() => {
            setShowPayments(true);
            setShowClients(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Payments">Payments</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("view-payment-method")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Payment Method">View Payment Method</div>
            </a>
          </li>

          <li className="menu-item">
            <a
              onClick={() => handleNavigate("add-bank-account")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add Bank Account</div>
            </a>
          </li>
          <li className="menu-item">
            <a onClick={() => handleNavigate("add-QR")} className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add QR</div>
            </a>
          </li>
          <li className="menu-item">
            <a onClick={() => handleNavigate("add-UPI")} className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add UPI</div>
            </a>
          </li>
          <li className="menu-item">
            <a
              onClick={() => handleNavigate("add-whatsapp-deposit")}
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add Whatsapp Deposit</div>
            </a>
          </li>
          <li className="menu-item">
            <a onClick={() => handleNavigate("add-USDT")} className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Add Payment Method">Add USDT</div>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Master;
