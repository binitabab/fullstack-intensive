import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export function Layout() {
  const { user, logout } = useAuth();

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
        <div className="session">
          <span className="muted session-email">{user?.email}</span>
          <button type="button" className="btn btn-secondary" onClick={() => logout()}>
            Log out
          </button>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
