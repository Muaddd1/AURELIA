import { Star } from "lucide-react";
import clsx from "clsx";

export function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          strokeWidth={1.25}
          className={clsx(n <= Math.round(rating) ? "fill-gold text-gold" : "fill-transparent text-mute")}
        />
      ))}
    </div>
  );
}
