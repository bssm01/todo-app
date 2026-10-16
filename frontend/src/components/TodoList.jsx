import EmptyState from "./EmptyState.jsx";
import TodoCard from "./TodoCard.jsx";

export default function TodoList({
  todos,
  loading,
  busyIds,
  filter,
  query,
  onToggle,
  onEdit,
  onDelete,
  onAddTask,
}) {
  return (
    <section className="todo-list" aria-live="polite">
      {loading ? (
        <div className="loading-state">
          <span className="loader" />
          Gathering your tasks…
        </div>
      ) : todos.length ? (
        todos.map((todo) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            busy={busyIds.includes(todo._id)}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <EmptyState filter={filter} query={query} onAddTask={onAddTask} />
      )}
    </section>
  );
}
