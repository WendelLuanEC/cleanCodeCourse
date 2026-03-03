import { validateName } from "../src/validateName";

test.each([
    "john Doe",
    "john Doe xy",
    "john Doe xy z",
])("Deve validar o nome: %s", (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(true);
});

test.each([
    "John",
    "",
])("Não deve validar o nome: %s", (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(false);
});

