import { NavLink, Outlet } from "react-router-dom";

/**
 * Shell around every page.
 * <Outlet /> = where the matched route page renders (React Router).
 */
export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">BF</span>
          <div>
            <strong>BizFlow</strong>
            <p className="brand-sub">Operations dashboard</p>
          </div>
        </div>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/customers">Customers</NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
