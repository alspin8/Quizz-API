import { Request, Response } from "express"
import { BaseError } from "sequelize"
import { Level } from "../models/level.model"
import { logger } from "../utils/logger"

const getLevels = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    try {
        const levels = await Level.findAll()
        if(levels.length)
            return res.status(200).json(levels)
        else
            return res.status(404).json({ message: "No Level found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

const getLevel = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    const { id, value } = req.query
    try {
        let level : Level | null = null
        if(id)
            level = await Level.findByPk(id as string)
        else if(value)
            level = await Level.findOne({ where: { value: Number(value) } })
        else
            return res.send(400).json({ message: "You must give at least one of the following parameter [id, value]." })

        if(level)
            return res.status(200).json(level)
        else
            return res.status(404).json({ message: "No Level found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

export {
    getLevels,
    getLevel
}