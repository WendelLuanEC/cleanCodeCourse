import { AccountDAOMemory } from "../src/AccountDAO";
import AccountService from "../src/AccountService";

let accountService: AccountService;

beforeEach(() => {
    const accountDAO = new AccountDAOMemory();
    accountService = new AccountService(accountDAO);
});

test("Deve criar uma conta", async () => {
    
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678Ac"
    }
    const outputSigunp = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSigunp.accountId);
    expect(outputSigunp.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
});

test("Não deve criar uma conta se o nome for inválido", async () => {
    const input = {
     name: "John ",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678"
    }

    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta se o email for inválido", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@",
     document: "97456321558",
     password:  "12345678"
    }

    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid email"));
});

test("Não deve criar uma conta se o document for inválido", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321",
     password:  "123456780"
    }

    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid document"));
});

test("Não deve criar uma conta se o senha tiver menos de 8 caracteres", async () => {
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345"
    }

    await expect(() => accountService.signup(input)).rejects.toThrow(new Error("Invalid password"));
});
