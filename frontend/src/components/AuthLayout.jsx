import Brand from "./Brand.jsx";

export default function AuthLayout({ story, kicker, title, subtitle, children }) {
  return (
    <main className="auth-layout">
      <section className="auth-story">
        <Brand light />
        <div className="story-copy">
          <span className="eyebrow">✳ &nbsp;A LITTLE MORE INTENTIONAL</span>
          <h1>{story.heading}</h1>
          <p>{story.copy}</p>
        </div>
        <div className="story-note">
          <span className="note-check">✓</span>
          <span>
            <strong>Small steps add up.</strong>
            <small>Your next great day starts here.</small>
          </span>
          <i>✳</i>
        </div>
        <div className="story-orb" />
      </section>
      <section className="auth-panel">
        <Brand className="auth-mobile-brand" />
        <div className="auth-form-wrap">
          <span className="auth-kicker">{kicker}</span>
          <h2>{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
        <span className="auth-footer">A softer start to a more focused day.</span>
      </section>
    </main>
  );
}
