const formattedDate = new Intl.DateTimeFormat("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(new Date());

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span>/</span>
        <strong>My tasks</strong>
      </div>
      <div className="topbar-date">☼ &nbsp;{formattedDate}</div>
    </header>
  );
}
