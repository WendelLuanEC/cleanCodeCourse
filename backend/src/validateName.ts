export function validateName(name: string) {
    return /^[A-Za-z]+(?: [A-Za-z]+)+$/.test(name.trim());
}
