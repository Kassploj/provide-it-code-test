import express from "express";
import { storeRouter } from "./router.js"

const app = express();

app.listen(3000)
app.use(storeRouter)