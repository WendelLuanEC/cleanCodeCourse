import AccountService from "./AccountService";
import HttpServer from "./HttpServer";
import { inject } from "./Registry";


// Interface Adapter
export default class AccountController {
    @inject("httpServer")
    httpServer!: HttpServer
    @inject("accountService")
    accountService!: AccountService

    constructor(){
        this.httpServer.route("post", "/signup", async (params: any, body: any) => {
            const output = await this.accountService.signup(body) 
            return output;
    });


    this.httpServer.route("get", "/accounts/:accountId", async (params: any, body: any) =>{
        const output = await this.accountService.getAccount(params.accountId)
        return output;
    });
}}