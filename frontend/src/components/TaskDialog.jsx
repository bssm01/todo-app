import { useState } from "react";

export default function TaskDialog({ task, onClose, onSave, busy }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog-heading">
          <div>
            <span className="auth-kicker">
              {task ? "MAKE IT JUST RIGHT" : "ONE THING AT A TIME"}
            </span>
            <h2 id="dialog-title">{task ? "Edit task" : "Add a task"}</h2>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form
          className="dialog-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSave({ title: title.trim(), description: description.trim() });
          }}
        >
          <label>
            <span>Task name</span>
            <input
              autoFocus
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs doing?"
              required
            />
          </label>
          <label>
            <span>A few details</span>
            <textarea
              maxLength={1000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a note or a little context…"
              rows={4}
              required
            />
          </label>
          <div className="dialog-actions">
            <button className="button button-quiet" type="button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="button button-primary"
              disabled={busy || !title.trim() || !description.trim()}
            >
              {busy ? "Saving…" : task ? "Save changes" : "Add task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
