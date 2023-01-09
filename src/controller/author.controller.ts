import { Request, Response } from "express";
import { BaseError } from "sequelize";
import { Author } from "../models/auhtor.model";
import { logger } from "../utils/logger";

const getAuthors = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    try {
        const authors = await Author.findAll()
        if(authors.length)
            return res.status(200).json(authors)
        else
            return res.status(404).json({ message: "No Author found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

const getAuthor = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    const { id, first, last } = req.query
    try {
        let author : Author | Author[] | null = null
        if(id) 
            author = await Author.findByPk(id as string)
        else if(first && last)
            author = await Author.findOne({ where: { first: first as string, last: last as string } })
        else if(first)
            author = await Author.findAll({ where: { first: first as string } })
        else if (last)
            author = await Author.findAll({ where: { last: last as string } })
        else
            return res.status(400).json({ message: "You must give at least one of the following parameter [id, first, last, { first, last }]." })

        if(author)
            return res.status(200).json(author)
        else
            return res.status(404).json({ message: "No Author found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

export { 
    getAuthors,
    getAuthor 
}