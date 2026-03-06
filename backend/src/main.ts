import cors from "cors";
import crypto from "crypto";
import express, { Request, Response } from "express";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName";
import { validatepassword } from "./validatePassword";
const app = express();
app.use(cors());
app.use(express.json());

const connection = pgp()("postgres://postgres:123456@db:5432/app");

app.post("/signup", async (req: Request, res: Response) => {
    const account = req.body;
    const accountId = crypto.randomUUID();
    if (!validateName(account.name)) {
    res.status(422).json({
        message: "Invalid name"
    });
    return;
    }

    if (!validateEmail(account.email)) {
    res.status(422).json({
        message: "Invalid email"
    });
        return;
    }

    if (!validateCpf(account.document)) {
    res.status(422).json({
        message: "Invalid document"
    });
        return;
    }

    if(!validatepassword(account.password)) {
        res.status(422).json({
            message: "Invalid password"
        });
        return;
    }

    await connection.query("INSERT INTO ccca.account(account_id, name, email, document, password) VALUES($1, $2, $3, $4, $5)", [
        accountId,
        account.name,
        account.email,
        account.document,
        account.password
    ]);

    res.json({ accountId: accountId });
}); 


app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    if (typeof accountId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(accountId)) {
        res.status(422).json({
            message: "Invalid accountId"
        });
        return;
    }
    const [account] = await connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
    res.json(account);
});


