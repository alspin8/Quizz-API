import { Router } from "express";
import { getAuthor, getAuthors } from "../controller/author.controller";

const router = Router()

router.get('/all', getAuthors)
router.get('/', getAuthor)

export { router }