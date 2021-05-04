declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            DATABASE_HOST: string,
            DATABASE_NAME: string,
            DATABASE_USER: string,
            DATABASE_PORT: any,
            DATABASE_PASSWORD: string,
        }
    }
}

require("dotenv").config();


import express, {Express, Request, NextFunction, Response} from 'express'
import db from './model/database'
import getGeoData from './routers/getGeographicData'
import path from 'path'

const app: Express = express();

app.use(express.json());

app.use((req:Request, res:Response, next: NextFunction)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((error: any, req: Request, res: Response, next: NextFunction)=> {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal server error'
        }
    })
})


app.use('/api',getGeoData)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req: Request, res: Response) => {
        // @ts-ignore
      res.sendFile(path.resolve(__dirname), "frontend", "build", "index.html");
    });
  } else {
    app.get("/", (req: Request, res: Response) => {
      res.json({ hi: "hi" });
    });
  }


app.listen(process.env.PORT || '5000');
