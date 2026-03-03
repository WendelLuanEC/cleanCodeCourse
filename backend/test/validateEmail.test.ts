import { validateEmail } from "../src/validateEmail";

test.each([
    "john.doe@gmail.com"
])("Deve validar o email: %s", (email: string) => {
    const isValid = validateEmail(email);
    console.log(isValid);
    expect(isValid).toBe(true);
});

test.each([
    "jhon@",
    "john@.com",
    "john@gmail",
    "DSDSFFSDSDS5654",
])("Não deve validar um email: %s", (email: string) => {
    const isValid = validateEmail(email);
    expect(isValid).toBe(false);
});

