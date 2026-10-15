export function EmptyState({ title, message, action }) {
  return (
    <div className="state state-empty">
      <h3>{title}</h3>
      {message ? <p>{message}</p> : null}
      {action ?? null}
    </div>
  );
}
