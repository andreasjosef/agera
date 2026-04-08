
import express from "express";
import type { Express } from "express";
import cors from 'cors'


const app: Express = express();


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.json({message: 'Homepage'})
})


export default app