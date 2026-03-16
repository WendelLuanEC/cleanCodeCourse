import Sinon from "sinon";
import { AccountDAODatabase, AccountDAOMemory } from "../src/AccountDAO";
import AccountService from "../src/AccountService";

let accountService: AccountService;

beforeEach(() => {
    //const accountDAO = new AccountDAOMemory();
    const accountDAO = new AccountDAODatabase();
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


test("Deve criar uma conta com stub", async () => {
    //Quando o teste for executado, o método save do AccountDAODatabase irá retornar uma Promise resolvida, ou seja, ele não irá salvar nada no banco de dados, apenas irá simular o comportamento de salvar uma conta.
    const saveStub =Sinon.stub(AccountDAODatabase.prototype, "save").resolves();
    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678Ac"
    }

    //Quando o teste for executado, o método getById do AccountDAODatabase irá retornar uma Promise resolvida com o input, ou seja, ele não irá buscar nada no banco de dados, apenas irá simular o comportamento de buscar uma conta pelo id.
    const getByIdStub = Sinon.stub(AccountDAODatabase.prototype, "getById").resolves(input);
    const outputSigunp = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSigunp.accountId);
    expect(outputSigunp.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
    saveStub.restore();
    getByIdStub.restore();
});

test("Deve criar uma conta com spy", async () => {
    //Quando o teste for executado, o método save do AccountDAODatabase irá ser monitorado, ou seja, ele irá salvar a conta no banco de dados, mas também irá registrar as chamadas feitas ao método, como por exemplo, quantas vezes ele foi chamado e com quais argumentos.
    const saveSpy = Sinon.spy(AccountDAODatabase.prototype, "save");

    //Quando o teste for executado, o método getById do AccountDAODatabase irá ser monitorado, ou seja, ele irá buscar a conta no banco de dados, mas também irá registrar as chamadas feitas ao método, como por exemplo, quantas vezes ele foi chamado e com quais argumentos.
    const getByIdSpy = Sinon.spy(AccountDAODatabase.prototype, "getById");


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

    //Verifica se o método save do AccountDAODatabase foi chamado apenas uma vez.
    expect(saveSpy.calledOnce).toBe(true);

    //Verifica se o método save do AccountDAODatabase foi chamado com o input e o accountId gerado.
    expect(getByIdSpy.calledOnce).toBe(true);

    //Verifica se o método getById do AccountDAODatabase foi chamado com o accountId gerado.
    expect(getByIdSpy.calledWith(outputSigunp.accountId)).toBe(true);

    //Restaura o comportamento original dos métodos, ou seja, eles irão voltar a salvar e buscar contas no banco de dados normalmente.
    saveSpy.restore();
    getByIdSpy.restore();
});


test.only("Deve criar uma conta com mock", async () => {
    
    //Quando o teste for executado, o método save do AccountDAODatabase irá ser simulado, ou seja, ele irá salvar a conta no banco de dados, mas também irá verificar se o método foi chamado com os argumentos corretos, como por exemplo, o input e o accountId gerado.
    const accountDAOMock = Sinon.mock(AccountDAODatabase.prototype);

    //Quando o teste for executado, o método save do AccountDAODatabase irá retornar uma Promise resolvida, ou seja, ele não irá salvar nada no banco de dados, apenas irá simular o comportamento de salvar uma conta.
    accountDAOMock.expects("save").once().resolves();

    const input = {
     name: "John Doe",
     email: "john.doe@gmail.com",
     document: "97456321558",
     password:  "12345678Ac"
    }

    //Quando o teste for executado, o método getById do AccountDAODatabase irá retornar uma Promise resolvida com o input, ou seja, ele não irá buscar nada no banco de dados, apenas irá simular o comportamento de buscar uma conta pelo id.
    accountDAOMock.expects("getById").onSecondCall().resolves(input);
    const outputSigunp = await accountService.signup(input);
    const outputGetAccount = await accountService.getAccount(outputSigunp.accountId);
    expect(outputSigunp.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);

    //Verifica se o método save do AccountDAODatabase foi chamado com o input e o accountId gerado.
    accountDAOMock.verify();  
    
    //Restaura o comportamento original dos métodos, ou seja, eles irão voltar a salvar e buscar contas no banco de dados normalmente.
    accountDAOMock.restore();
});

test("Deve criar uma conta com fake", async () => {
    const accountDAO = new AccountDAOMemory();
    accountService = new AccountService(accountDAO);
    
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