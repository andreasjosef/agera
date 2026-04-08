
import express from "express";
import type { Express } from "express";
import cors from 'cors'
import requirementsRouter from "./routes/requirement.routes.ts";


const app: Express = express();


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.json({message: 'Homepage'})
})

app.use('/api/', requirementsRouter)


export default app