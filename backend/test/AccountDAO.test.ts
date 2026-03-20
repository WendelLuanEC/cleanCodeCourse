import { AccountDAODatabase } from "../src/AccountDAO";
import { PgPromiseAdapter } from "../src/DatabaseConnection";
import Registry from "../src/Registry";

test("Deve persistir uma conta", async () => {
    const connection = new PgPromiseAdapter();
    Registry.getInstance().provide("databaseConnection", connection);
    const accountDAO = new AccountDAODatabase();
    const account = {
        accountId: crypto.randomUUID(),
        name: "John Doe",
        email: "john.doe@gmail.com",
        document: "97456321558",
        password: "12345678Ac",
    };
    await accountDAO.save(account);
    const savedAccount = await accountDAO.getById(account.accountId);
    expect(account.accountId).toBe(account.accountId);
    expect(savedAccount.name).toBe(account.name);
    expect(savedAccount.email).toBe(account.email);
    expect(savedAccount.document).toBe(account.document);
    expect(savedAccount.password).toBe(account.password);

    await connection.close();
});
