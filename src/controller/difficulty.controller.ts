import { Request, Response } from "express";
import { BaseError, Op } from "sequelize";
import { Difficulty, TDifficulty } from "../models/difficulty.model";
import { Langage } from "../models/langage.model";
import { logger } from "../utils/logger";


const getDifficulties = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    let { langage } = req.params
    
    try {
        if(isNaN(Number(langage))) {            
            const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
            if(idLangage)
                langage = idLangage.get().id.toString()
            else
                return res.status(400).json({ message: "You must give a valid langage code." })
        }
        
        const difficulties = await Difficulty.findAll(
            {
                include: {
                    association: Difficulty.associations.difficulties,
                    where: {
                        idLangage: {
                            [Op.eq]: langage
                        }
                    }
                },
                order: [
                    ['id', 'ASC']
                ]
            }
        )

        if(difficulties.length) {
            const tdifficulties : Array<TDifficulty | undefined> = []
            for(const Difficulty of difficulties) {
                tdifficulties.push(Difficulty.difficulties?.at(0))
            }
            return res.status(200).json(tdifficulties)
        }
        else
            return res.status(404).json({ message: "No Author found." })

    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

const getDifficulty = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    let { langage } = req.params
    const { id, text } = req.query
    try {
        if(isNaN(Number(langage))) {
            const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
            if(idLangage)
                langage = idLangage.get().id.toString()
            else
                return res.status(400).json({ message: "You must give a valid langage code." })
        }

        let difficulty : Difficulty | null = null
        if(id) {
            difficulty = await Difficulty.findOne(
                {
                    where: {
                        id: Number(id)
                    },
                    include: {
                        association: Difficulty.associations.difficulties,
                        where: {
                            idLangage: {
                                [Op.eq]: langage
                            },
                        }
                    }
                }
            )
        }
        else if(text) {
            difficulty = await Difficulty.findOne(
                {
                    include: {
                        association: Difficulty.associations.difficulties,
                        where: {
                            idLangage: {
                                [Op.eq]: langage
                            },
                            text: {
                                [Op.eq]: text
                            }
                        }
                    }
                }
            )
        }
        else
            return res.status(400).json({ message: "You must give at least one of the following parameter [id, text]" })
        
        if(difficulty)
            return res.status(200).json(difficulty)
        else
            return res.status(404).json({ message: "No Difficulty found." })

    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

export { getDifficulties, getDifficulty }