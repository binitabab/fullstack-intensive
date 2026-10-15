export function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <h3>{title}</h3>
      {message ? <p>{message}</p> : null}
      {onRetry ? (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}
