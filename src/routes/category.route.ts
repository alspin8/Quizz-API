import { Router } from "express";
import { getCategories, getCategory } from "../controller/category.controller";

const router : Router = Router()

router.get('/:langage/all', getCategories)
router.get('/:langage/', getCategory)

export { router }