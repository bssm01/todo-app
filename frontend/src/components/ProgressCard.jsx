export default function ProgressCard({ counts }) {
  const percent = counts.all ? Math.round((counts.completed / counts.all) * 100) : 0;

  return (
    <section className="progress-card">
      <span className="progress-icon">✳</span>
      <div className="progress-copy">
        <strong>
          {counts.completed ? "Look at you, making progress." : "Every little bit counts."}
        </strong>
        <span>
          {counts.all
            ? `${counts.completed} of ${counts.all} tasks completed today`
            : "A fresh page. What would you like to get done?"}
        </span>
      </div>
      {counts.all > 0 && (
        <div className="progress-meter">
          <div>
            <span style={{ width: `${percent}%` }} />
          </div>
          <small>{percent}%</small>
        </div>
      )}
      <span className="progress-decoration">✳</span>
    </section>
  );
}
