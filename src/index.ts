require('dotenv').config()

import express, { Express } from "express"
import cors from 'cors'
import bodyParser from "body-parser";

import { initOrUpdateDatabase } from "./database/startup";

import { router as author } from "./routes/author.route";
import { router as langage } from "./routes/langage.route"
import { router as category } from "./routes/category.route"
import { router as difficulty } from "./routes/diffyculty.route";
import { router as level } from "./routes/level.route";
import { router as quizz } from "./routes/quizz.route";

import { morganMiddleware } from "./middleware/morgan.middleware";
import { notFound } from "./middleware/other.middleware";

const app : Express = express()
const port : string | number = process.env.PORT as string || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morganMiddleware)

app.use('/author', author)
app.use('/langage', langage)
app.use('/category', category)
app.use('/difficulty', difficulty)
app.use('/level', level)
app.use('/quizz', quizz)

/* 404 not found */
app.use(notFound)

app.listen(port, async() => {
    await initOrUpdateDatabase();
    console.log(`App listening on port ${port}!`)
})