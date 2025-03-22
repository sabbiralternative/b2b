import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useDispatch } from "react-redux";
import { setShowSidebar } from "../../../redux/features/global/globalSlice";

const SidebarItems = () => {
  const dispatch = useDispatch();
  const [showClients, setShowClients] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const navigate = useNavigate();

  const clientsRef = useRef();
  useCloseModalClickOutside(clientsRef, () => {
    setShowClients(false);
  });

  const statementRef = useRef();
  useCloseModalClickOutside(statementRef, () => {
    setShowStatement(false);
  });
  const paymentsRef = useRef();
  useCloseModalClickOutside(paymentsRef, () => {
    setShowPayments(false);
  });

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setShowClients(false);

    setShowPayments(false);
    setShowStatement(false);

    dispatch(setShowSidebar(false));
  };

  return (
    <ul className="menu-inner overflow-auto" style={{ marginLeft: "0px" }}>
      <li className="menu-item">
        <Link
          onClick={() => setShowSidebar(false)}
          to="/"
          className="menu-link"
        >
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Dashboards">Dashboard</div>
        </Link>
      </li>

      <li ref={clientsRef} className={`menu-item ${showClients ? "open" : ""}`}>
        <a
          onClick={() => {
            setShowClients((prev) => !prev);

            setShowPayments(false);
            setShowStatement(false);
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
            <Link
              onClick={() => setShowSidebar(false)}
              to="/clients-with-balance"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">Clients with balance</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/all-client"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">All Client</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/active-client"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">Active Client</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              onClick={() => setShowSidebar(false)}
              to="/inactive-client"
              className="menu-link"
            >
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="View Branches">Inactive Client</div>
            </Link>
          </li>
        </ul>
      </li>

      <li
        ref={statementRef}
        className={`menu-item ${showStatement ? "open" : ""}`}
      >
        <a
          onClick={() => {
            setShowStatement((prev) => !prev);
            setShowClients(false);

            setShowPayments(false);
          }}
          className="menu-link menu-toggle"
        >
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Statement">Statement</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="All Statement">All Statement</div>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Deposit Statement">Deposit Statement</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <i className="menu-icon tf-icons bx bxs-institution"></i>
              <div data-i18n="Withdraw Statement">Withdraw Statement</div>
            </a>
          </li>
        </ul>
      </li>

      <li
        ref={paymentsRef}
        className={`menu-item ${showPayments ? "open" : ""}`}
      >
        <a
          onClick={() => {
            setShowPayments((prev) => !prev);
            setShowClients(false);

            setShowStatement(false);
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

export default SidebarItems;
