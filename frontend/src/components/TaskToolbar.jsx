export default function TaskToolbar({ filter, total, query, onQueryChange }) {
  const heading = filter === "completed" ? "Completed" : filter === "active" ? "In progress" : "Your tasks";

  return (
    <div className="task-toolbar">
      <div className="section-heading">
        <h2>{heading}</h2>
        <span className="task-total">{total}</span>
      </div>
      <label className="search-field">
        <span>⌕</span>
        <input
          aria-label="Search tasks"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Find a task…"
        />
        {query && (
          <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search">
            ×
          </button>
        )}
      </label>
    </div>
  );
}
