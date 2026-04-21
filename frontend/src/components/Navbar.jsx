import { NavLink } from 'react-router-dom';

function Navbar({ currentTheme, onToggleTheme, themeActionLabel }) {
  return (
    <header className="navbar-wrap">
      <div className="navbar">
        <div className="brand-block">
          <h1>TeamPulse</h1>
          <p>Team Management Platform</p>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink
            to="/add-member"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Add Member
          </NavLink>
          <NavLink
            to="/members"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            View Members
          </NavLink>
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={themeActionLabel}
          title={themeActionLabel}
        >
          {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
