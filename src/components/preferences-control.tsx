import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Globe, Moon, Sun } from "lucide-react";
import { useLocale } from "~/hooks/use-locale";
import { usePreferences } from "~/hooks/use-preferences";
import { localeLabels, localeList, type Locale } from "~/lib/locales";
import { Route } from "~/routes/__root";
import { cn } from "~/lib/utils";

function useResolvedTheme() {
  const serverTheme = Route.useLoaderData()?.theme;
  if (serverTheme) return serverTheme;
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

export function PreferencesControl() {
  const { language, t } = useLocale();
  const save = usePreferences();
  const resolvedTheme = useResolvedTheme();
  const ThemeIcon = resolvedTheme === "dark" ? Sun : Moon;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-end p-4">
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-hairline bg-paper/70 p-1 backdrop-blur-sm">
        <button
          type="button"
          onClick={() =>
            void save({ theme: resolvedTheme === "dark" ? "light" : "dark" })
          }
          aria-label={t.common.toggleTheme}
          aria-pressed={resolvedTheme === "dark"}
          title={t.common.toggleTheme}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-graphite transition-colors hover:text-ink focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-stamp focus-visible:outline-none"
        >
          <ThemeIcon className="size-4" aria-hidden="true" />
        </button>

        <MenuPrimitive.Root>
          <MenuPrimitive.Trigger
            aria-label={t.common.language}
            title={t.common.language}
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium tracking-wide text-graphite transition-colors hover:text-ink focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-stamp focus-visible:outline-none data-[popup-open]:bg-paper2 data-[popup-open]:text-ink"
          >
            <Globe className="size-4" aria-hidden="true" />
            <span className="uppercase">{language}</span>
          </MenuPrimitive.Trigger>
          <MenuPrimitive.Portal>
            <MenuPrimitive.Positioner
              sideOffset={6}
              align="end"
              className="z-50 outline-none"
            >
              <MenuPrimitive.Popup className="min-w-40 overflow-hidden rounded-lg border border-hairline bg-paper p-1 shadow-lg">
                <MenuPrimitive.Group>
                  <MenuPrimitive.GroupLabel className="sr-only">
                    {t.common.language}
                  </MenuPrimitive.GroupLabel>
                  <MenuPrimitive.RadioGroup
                    value={language}
                    onValueChange={(value) =>
                      void save({ locale: value as Locale })
                    }
                  >
                    {localeList.map((locale) => (
                      <MenuPrimitive.RadioItem
                        key={locale}
                        value={locale}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-graphite transition-colors outline-none hover:bg-paper2 hover:text-ink focus-visible:bg-paper2 focus-visible:text-ink data-[checked]:text-ink data-[highlighted]:bg-paper2 data-[highlighted]:text-ink",
                        )}
                      >
                        {localeLabels[locale]}
                        <MenuPrimitive.RadioItemIndicator
                          keepMounted
                          className="size-1.5 rounded-full bg-stamp opacity-0 transition-opacity data-[checked]:opacity-100"
                        />
                      </MenuPrimitive.RadioItem>
                    ))}
                  </MenuPrimitive.RadioGroup>
                </MenuPrimitive.Group>
              </MenuPrimitive.Popup>
            </MenuPrimitive.Positioner>
          </MenuPrimitive.Portal>
        </MenuPrimitive.Root>
      </div>
    </div>
  );
}
