export default function WelcomeHeader({ onAddTask }) {
  return (
    <div className="welcome-row">
      <div>
        <span className="eyebrow">
          <i /> YOUR PERSONAL SPACE
        </span>
        <h1>
          A good day<br className="mobile-break" /> starts <em>here.</em>
        </h1>
        <p className="welcome-copy">Take a breath. Pick your next small step.</p>
      </div>
      <button className="button button-primary add-task" onClick={onAddTask}>
        <span>＋</span> Add a task
      </button>
    </div>
  );
}
