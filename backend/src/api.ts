import { AccountAssetDAODatabase } from "./AccountAssetDAO";
import AccountController from "./AccountController";
import { AccountDAODatabase } from "./AccountDAO";
import AccountService from "./AccountService";
import { PgPromiseAdapter } from "./DatabaseConnection";
import { ExpressAdapter } from "./HttpServer";
import Registry from "./Registry";


// entrypoint
async function main () {
    const httpServer = new ExpressAdapter();
    Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter())
    Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountService", new AccountService());
    Registry.getInstance().provide("httpServer", httpServer)
    new AccountController();
    
    httpServer.listen(3000);
}

main();
