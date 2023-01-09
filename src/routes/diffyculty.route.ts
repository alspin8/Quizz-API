import { Router } from "express";
import { getDifficulties, getDifficulty } from "../controller/difficulty.controller";

const router : Router = Router()

router.get('/:langage/all', getDifficulties)
router.get('/:langage/', getDifficulty)

export { router }