import cors from "cors";
import express from "express";
export default interface HttpServer {
    route(method: string, url: string, callback: Function): void;
    listen (port: number): void;
}

// Framework and Driver
export class ExpressAdapter implements HttpServer {
    app:  any;
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
    }

    route(method: string, url: string, callback: Function): void {
        this.app[method](url, async (req: any, res: any) => {
            const params = req.params;
            const body = req.body;
            console.log(url, params, body);
             try {
            const output = await callback(params, body);
            res.json(output);
            }
             catch (e: any) {
                res.status(422).json({
                message: e.message,
        });
    }
        });
    }
    listen(port: number): void {
        this.app.listen(3000);
    }

}