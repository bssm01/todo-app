import Brand from "./Brand.jsx";

export default function Sidebar({ user, filter, counts, onFilterChange, onSignOut }) {
  const filters = [
    ["all", "▦", "All tasks", counts.all],
    ["active", "○", "In progress", counts.active],
    ["completed", "✓", "Completed", counts.completed],
  ];

  return (
    <aside className="sidebar">
      <Brand />
      <span className="sidebar-label">WORKSPACE</span>
      <nav className="side-nav" aria-label="Task filters">
        {filters.map(([key, icon, label, count]) => (
          <button
            key={key}
            className={`nav-item${filter === key ? " active" : ""}`}
            onClick={() => onFilterChange(key)}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
            <span className="nav-count">{count}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <span>✳</span>
          <p>
            Progress, not perfection.
            <br />
            <small>You've got this.</small>
          </p>
        </div>
        <button className="profile-button" onClick={onSignOut}>
          <span className="avatar">
            {(user?.username || "Y").trim().charAt(0).toUpperCase()}
          </span>
          <span className="profile-text">
            <strong>{user?.username || "Your account"}</strong>
            <small>Sign out</small>
          </span>
          <span className="logout-icon">↗</span>
        </button>
      </div>
    </aside>
  );
}
