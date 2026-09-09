import { Link } from "react-router-dom";

export function EmptyState({
  title,
  message,
  actionLabel,
  actionTo,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="flex flex-col items-center py-32 text-center">
      <h2 className="font-display text-3xl">{title}</h2>
      <p className="mt-3 max-w-md text-sm text-mute">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-outline mt-8 text-ink">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
