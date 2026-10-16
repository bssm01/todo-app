import { useCallback, useEffect, useState } from "react";
import AuthScreen from "./components/AuthScreen.jsx";
import ProgressCard from "./components/ProgressCard.jsx";
import ResetPasswordScreen from "./components/ResetPasswordScreen.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TaskDialog from "./components/TaskDialog.jsx";
import TaskToolbar from "./components/TaskToolbar.jsx";
import Toast from "./components/Toast.jsx";
import TodoList from "./components/TodoList.jsx";
import Topbar from "./components/Topbar.jsx";
import WelcomeHeader from "./components/WelcomeHeader.jsx";
import { useTodos, useVisibleTodos } from "./hooks/useTodos.js";
import { clearSession, readToken, readUser, saveSession } from "./lib/session.js";

function App() {
  const isResetPasswordPath = window.location.pathname === "/reset-password";
  const [token, setToken] = useState(() => readToken());
  const [user, setUser] = useState(() => readUser());
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [dialogTask, setDialogTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const signOut = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);
  const handleNotice = useCallback((message) => setNotice(message), []);
  const handleUnauthorized = useCallback(() => signOut(), [signOut]);

  const activeToken = isResetPasswordPath ? null : token;
  const { todos, loading, busyIds, saving, counts, toggleTodo, saveTodo, deleteTodo } = useTodos({
    token: activeToken,
    onNotice: handleNotice,
    onUnauthorized: handleUnauthorized,
  });
  const visibleTodos = useVisibleTodos(todos, filter, query);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 4500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function authenticate(nextToken, nextUser) {
    const safeUser = saveSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(safeUser);
    setNotice("");
  }

  function openNewTask() {
    setDialogTask(null);
    setDialogOpen(true);
  }
  function openEditTask(todo) {
    setDialogTask(todo);
    setDialogOpen(true);
  }
  function closeDialog() {
    setDialogOpen(false);
    setDialogTask(null);
  }
  async function handleSave(values) {
    const saved = await saveTodo(dialogTask, values);
    if (saved) closeDialog();
  }

  if (isResetPasswordPath) return <ResetPasswordScreen />;
  if (!token) return <AuthScreen onAuthenticated={authenticate} />;

  return (
    <div className="app-shell">
      <Sidebar
        user={user}
        filter={filter}
        counts={counts}
        onFilterChange={setFilter}
        onSignOut={signOut}
      />
      <main className="main-content">
        <Topbar />
        <section className="page-content">
          <WelcomeHeader onAddTask={openNewTask} />
          <ProgressCard counts={counts} />
          <TaskToolbar filter={filter} total={visibleTodos.length} query={query} onQueryChange={setQuery} />
          <TodoList
            todos={visibleTodos}
            loading={loading}
            busyIds={busyIds}
            filter={filter}
            query={query}
            onToggle={toggleTodo}
            onEdit={openEditTask}
            onDelete={deleteTodo}
            onAddTask={openNewTask}
          />
          <footer className="page-footer">
            <span>Made for your everyday.</span>
            <span>
              One thing at a time <i>✳</i>
            </span>
          </footer>
        </section>
      </main>
      <Toast message={notice} onDismiss={() => setNotice("")} />
      {dialogOpen && (
        <TaskDialog task={dialogTask} onClose={closeDialog} onSave={handleSave} busy={saving} />
      )}
    </div>
  );
}

export default App;
