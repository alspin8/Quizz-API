import { Router } from "express";
import { 
    getQuizzs,
    getQuizz
} from "../controller/quizz.controller";

const router = Router()


router.get('/:langage', getQuizzs)
router.get('/:langage/:quizz', getQuizz)


export { router }