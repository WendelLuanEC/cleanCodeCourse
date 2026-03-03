import { validatepassword } from "../src/validatePassword";

test.each([
    "asdSDF1223"
])("Deve validar uma senha: %s", (password: string) => {
    const isValid = validatepassword(password);
    expect(isValid).toBe(true);
});

test.each([
    "12345",
    "asvfgrtFFr",
    "asvfgrter",
    "DSDSFFSDSDS5654",
])("Não deve validar uma senha: %s", (password: string) => {
    const isValid = validatepassword(password);
    expect(isValid).toBe(false);
});