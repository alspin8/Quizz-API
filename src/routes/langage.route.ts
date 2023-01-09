import { Router } from "express";
import { getLangage, getLangages } from "../controller/langage.controller";

const router : Router = Router()

router.get('/all', getLangages)
router.get('/', getLangage)

export { router }