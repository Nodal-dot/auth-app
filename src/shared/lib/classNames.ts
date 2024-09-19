type Mods = Record<string, boolean | string>

export function classNames (cl: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        cl,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className)
    ].join(' ')
}
