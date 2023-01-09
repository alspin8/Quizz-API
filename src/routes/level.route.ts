import { Router } from "express";
import { getLevels, getLevel } from "../controller/level.controller";

const router = Router()

router.get('/all', getLevels)
router.get('/', getLevel)

export { router }