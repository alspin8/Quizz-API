import { Request, Response } from "express"
import { BaseError } from "sequelize"
import { Langage } from "../models/langage.model"
import { logger } from "../utils/logger"

const getLangages = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    try {
        const langages = await Langage.findAll()
        if(langages.length)
            return res.status(200).json(langages)
        else
            return res.status(404).json({ message: "No Author found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

const getLangage = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    const { id, code } = req.query
    try {
        let langage : Langage | null = null
        if(id)
            langage = await Langage.findByPk(id as string)
        else if(code)
            langage = await Langage.findOne({ where: { code: code as string } })
        else
            return res.send(400).json({ message: "You must give at least one of the following parameter [id, code]." })

        if(langage)
            return res.status(200).json(langage)
        else
            return res.status(404).json({ message: "No Langage found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

export {
    getLangages,
    getLangage
}