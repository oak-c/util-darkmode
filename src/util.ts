export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
    NO_PREF = 'no-preference',
    NO_SUPP = 'no-support',
}

export type DarkMode = (
    config: (activeTheme: Theme, themes: typeof Theme) => void
) => { removeListeners: () => void }

export const darkmode: DarkMode = (onChange = (t: Theme, themes: typeof Theme) => {}) => {
    const themes: typeof Theme = Object.freeze({
        DARK: Theme.DARK,
        LIGHT: Theme.LIGHT,
        NO_PREF: Theme.NO_PREF,
        NO_SUPP: Theme.NO_SUPP,
    })
    const darkQuery = window.matchMedia(`(prefers-color-scheme: ${themes.DARK})`)
    const lightQuery = window.matchMedia(`(prefers-color-scheme: ${themes.LIGHT})`)
    const noPrefQuery = window.matchMedia(`(prefers-color-scheme: ${themes.NO_PREF})`)
    const isSupported = darkQuery.matches || lightQuery.matches || noPrefQuery.matches

    const queryListener = (q: MediaQueryListEvent, theme: Theme) =>
        q.matches && onChange(theme, themes)
    const darkQueryListener = (q: MediaQueryListEvent) => queryListener(q, themes.DARK)
    const lightQueryListener = (q: MediaQueryListEvent) => queryListener(q, themes.LIGHT)

    if (isSupported) {
        if (darkQuery.matches) onChange(themes.DARK, themes)
        if (lightQuery.matches) onChange(themes.LIGHT, themes)
        if (noPrefQuery.matches) onChange(themes.NO_PREF, themes)

        darkQuery.addListener(darkQueryListener)
        lightQuery.addListener(lightQueryListener)
    } else {
        onChange(themes.NO_SUPP, themes)
    }
    return {
        removeListeners: () => {
            if (isSupported) {
                darkQuery.removeListener(darkQueryListener)
                lightQuery.removeListener(lightQueryListener)
            }
        },
    }
}
