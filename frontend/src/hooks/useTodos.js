import { useCallback, useEffect, useMemo, useState } from "react";
import { isAuthError, request } from "../lib/api.js";

export function useTodos({ token, onNotice, onUnauthorized }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [busyIds, setBusyIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = useCallback(() => setRefreshIndex((index) => index + 1), []);

  const handleError = useCallback(
    (error) => {
      onNotice(error.message);
      if (isAuthError(error)) onUnauthorized();
    },
    [onNotice, onUnauthorized],
  );

  useEffect(() => {
    if (!token) {
      setTodos([]);
      setLoading(false);
      return undefined;
    }
    let active = true;
    setLoading(true);
    request("/todo/todos", { token })
      .then((result) => {
        if (active) setTodos(Array.isArray(result) ? result : []);
      })
      .catch((error) => {
        if (!active) return;
        onNotice(error.message);
        if (isAuthError(error)) onUnauthorized();
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [token, refreshIndex, onNotice, onUnauthorized]);

  async function toggleTodo(todo) {
    setBusyIds((ids) => [...ids, todo._id]);
    try {
      const result = await request(`/todo/update/${todo._id}`, {
        method: "PUT",
        token,
        body: JSON.stringify({ status: !todo.status }),
      });
      setTodos((items) => items.map((item) => (item._id === todo._id ? result.todo : item)));
    } catch (error) {
      handleError(error);
    } finally {
      setBusyIds((ids) => ids.filter((id) => id !== todo._id));
    }
  }

  async function saveTodo(task, values) {
    setSaving(true);
    try {
      if (task) {
        const result = await request(`/todo/update/${task._id}`, {
          method: "PUT",
          token,
          body: JSON.stringify(values),
        });
        setTodos((items) => items.map((item) => (item._id === task._id ? result.todo : item)));
      } else {
        const result = await request("/todo/create", {
          method: "POST",
          token,
          body: JSON.stringify(values),
        });
        setTodos((items) => [result.todo, ...items]);
      }
      onNotice("");
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function deleteTodo(todo) {
    setBusyIds((ids) => [...ids, todo._id]);
    try {
      await request(`/todo/delete/${todo._id}`, { method: "DELETE", token });
      setTodos((items) => items.filter((item) => item._id !== todo._id));
      onNotice("");
    } catch (error) {
      handleError(error);
    } finally {
      setBusyIds((ids) => ids.filter((id) => id !== todo._id));
    }
  }

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.status).length,
      completed: todos.filter((todo) => todo.status).length,
    }),
    [todos],
  );

  return { todos, loading, busyIds, saving, counts, refresh, toggleTodo, saveTodo, deleteTodo };
}

export function useVisibleTodos(todos, filter, query) {
  return useMemo(() => {
    const search = query.trim().toLowerCase();
    return todos.filter((todo) => {
      const matchingFilter =
        filter === "all" || (filter === "active" ? !todo.status : todo.status);
      return (
        matchingFilter &&
        (!search || `${todo.title} ${todo.description}`.toLowerCase().includes(search))
      );
    });
  }, [todos, filter, query]);
}
