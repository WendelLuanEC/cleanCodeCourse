import express, { Request, Response } from "express";
import crypto from "crypto";
import pgp from "pg-promise"

const app = express();
app.use(express.json());


const connection = pgp()("postgres://postgres:123456@db:5432/app");


app.post("/signup", async (req: Request, res: Response) => {
    const account = req.body;
    const accoubntId = crypto.randomUUID();

    await connection.query("INSERT INTO ccca.account(account_id, name, email, document, password) VALUES($1, $2, $3, $4, $5)", [
        accoubntId,
        account.name,
        account.email,
        account.document,
        account.password
    ]);

    res.json({ accountId: accoubntId });
});


app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const [account] = await connection.query("SELECT * FROM ccca.account WHERE account_id = $1", [accountId]);
    res.json(account);
});

app.listen(3000);
