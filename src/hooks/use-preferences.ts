import { useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { savePreferences } from "~/server/save-preferences";
import type { Theme } from "~/server/load-theme";
import type { Locale } from "~/lib/locales";

export type PreferenceUpdate = { locale?: Locale; theme?: Theme };

export function usePreferences() {
  const router = useRouter();

  return useCallback(
    async (data: PreferenceUpdate) => {
      await savePreferences({ data });
      await router.invalidate();
    },
    [router],
  );
}
