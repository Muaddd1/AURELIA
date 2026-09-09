import { useEffect } from "react";
import { useUi } from "@/store/ui";

/** Reflects the theme store onto <html data-theme="..."> so CSS vars in index.css switch. */
export function useThemeSync() {
  const theme = useUi((s) => s.theme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
}
