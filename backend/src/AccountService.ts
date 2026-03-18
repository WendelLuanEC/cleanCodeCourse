import crypto from "crypto";
import AccountAssetDAO from "./AccountAssetDAO";
import AccountDAO from "./AccountDAO";
import { inject } from "./Registry";
import { validateCpf } from "./validateCpf";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName";
import { validatepassword } from "./validatePassword";

export default class AccountService {
    @inject("accountDAO")
    accountDAO!: AccountDAO;
    @inject("accountAssetDAO")
    accountAssetDAO!: AccountAssetDAO;

    async signup(account: any) {
        const accountId = crypto.randomUUID();
        if (!validateName(account.name)) throw new Error("Invalid name");
        if (!validateEmail(account.email)) throw new Error("Invalid email");
        if (!validateCpf(account.document)) throw new Error("Invalid document");
        if (!validatepassword(account.password)) throw new Error("Invalid password");
        await this.accountDAO.save({ ...account, accountId });

        return { accountId: accountId };
    }

    async getAccount(accountId: string) {
        const account = await this.accountDAO.getById(accountId);
        if (!account) throw new Error("Account not found");
        account.balances = await this.accountAssetDAO.getByAccountId(accountId);
        return account;
    }

    async deposit(accountAsset: any) {
        const account = await this.accountDAO.getById(accountAsset.accountId);
        if (!account) throw new Error("Account not found");
        await this.accountAssetDAO.save(accountAsset);
    }

    async withDraw(accountAsset: any) {
        const account = await this.getAccount(accountAsset.accountId);
        const balance = account.balances.find((balance: any) => balance.assetId === accountAsset.assetId);
        const quantity =parseFloat(balance.quantity) - accountAsset.quantity;
        if (quantity < 0) throw new Error("Insufficient balance");
        await this.accountAssetDAO.update(accountAsset.accountId, accountAsset, quantity);
    }
}
