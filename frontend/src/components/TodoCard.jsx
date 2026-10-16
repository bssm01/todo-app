export default function TodoCard({ todo, busy, onToggle, onEdit, onDelete }) {
  return (
    <article className={`todo-card${todo.status ? " todo-card-done" : ""}`}>
      <button
        className={`todo-check${todo.status ? " is-checked" : ""}`}
        onClick={() => onToggle(todo)}
        disabled={busy}
        aria-label={todo.status ? `Mark ${todo.title} as active` : `Complete ${todo.title}`}
      >
        {todo.status && "✓"}
      </button>
      <div className="todo-copy">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
      </div>
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} aria-label={`Edit ${todo.title}`} title="Edit">
          ↗
        </button>
        <button
          onClick={() => onDelete(todo)}
          disabled={busy}
          aria-label={`Delete ${todo.title}`}
          title="Delete"
        >
          ⌫
        </button>
      </div>
    </article>
  );
}
