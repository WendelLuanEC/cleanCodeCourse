import crypto from "crypto";
import AccountDAO from "./AccountDAO";
import { validateCpf } from "./validateCpf";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName";
import { validatepassword } from "./validatePassword";

export default class AccountService {

    constructor (readonly accountDAO: AccountDAO){
    }

    async signup (account: any) {
    const accountId = crypto.randomUUID();
    if (!validateName(account.name)) throw new Error("Invalid name");
    if (!validateEmail(account.email)) throw new Error("Invalid email");
    if (!validateCpf(account.document)) throw new Error("Invalid document");
    if(!validatepassword(account.password)) throw new Error("Invalid password");
    await this.accountDAO.save({ ...account, accountId });
    

    return { accountId: accountId };
};

    async getAccount (accountId: string) {
    const account = await this.accountDAO.getById(accountId);
    return account;
}
}
