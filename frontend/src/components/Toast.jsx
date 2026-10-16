export default function Toast({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="toast" role="status">
      {message}
      <button onClick={onDismiss} aria-label="Dismiss message">
        ×
      </button>
    </div>
  );
}
