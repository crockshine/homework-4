export const stringifyObject = <T extends Record<string, any>>(obj: T): Record<string, string> => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value?.toString()])
    );
}