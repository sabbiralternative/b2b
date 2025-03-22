import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <aside
      id="layout-menu"
      className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0 "
      style={{ touchAction: "none", userSelect: "none" }}
    >
      <div className="container-xxl d-flex h-100">
        <a className="menu-horizontal-prev d-none"></a>
        <div className="menu-horizontal-wrapper">
          <NavItems />
        </div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default Navbar;
