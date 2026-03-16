import cors from "cors";
import express, { Request, Response } from "express";
import { AccountDAOMemory } from "./AccountDAO";
import AccountService from "./AccountService";
const app = express();

app.use(cors());
app.use(express.json());

const accountDAO = new AccountDAOMemory();
const accountService = new AccountService(accountDAO);

app.post("/signup", async (req: Request, res: Response) => {
    const account = req.body;
    try {
        const output = await accountService.signup(account);
        res.json(output);
    } catch (e: any) {
        res.status(422).json({
            message: e.message
        });
    }
}); 


app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId as string;
    const output = await accountService.getAccount(accountId);
    res.json(output)
    });

app.listen(3000, () => {
    console.log("Server listening on http://localhost:3000");
});

