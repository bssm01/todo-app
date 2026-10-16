export default function Brand({ light = false, className = "" }) {
  return (
    <a className={`brand${light ? " brand-light" : ""}${className ? ` ${className}` : ""}`} href="/">
      <span className="brand-mark">✓</span>
      <span>daymark</span>
    </a>
  );
}
