const STATES = {
  search: {
    icon: "⌕",
    title: "Nothing found just yet",
    copy: "Try another search, or clear the search box.",
  },
  completed: {
    icon: "✓",
    title: "Your wins will show up here",
    copy: "Complete a task and take a moment to enjoy it.",
  },
  active: {
    icon: "☼",
    title: "All caught up",
    copy: "Everything is done. Enjoy a little breathing room.",
  },
  all: {
    icon: "☼",
    title: "Your list is a blank canvas",
    copy: "Add a task to give your day a gentle bit of direction.",
  },
};

export default function EmptyState({ filter, query, onAddTask }) {
  const state = query ? STATES.search : STATES[filter] || STATES.all;

  return (
    <div className="empty-state">
      <span className="empty-icon">{state.icon}</span>
      <h3>{state.title}</h3>
      <p>{state.copy}</p>
      {!query && filter === "all" && (
        <button className="button button-soft" onClick={onAddTask}>
          ＋ Create your first task
        </button>
      )}
    </div>
  );
}
