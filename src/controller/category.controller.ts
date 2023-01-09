import { Request, Response } from "express";
import { BaseError, Op } from "sequelize";
import { Category, TCategory } from "../models/category.model";
import { Langage } from "../models/langage.model";
import { logger } from "../utils/logger";


const getCategories = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    let { langage } = req.params
    
    try {
        if(isNaN(Number(langage))) {            
            const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
            if(idLangage)
                langage = idLangage.get().id.toString()
            else
                return res.status(400).json({ message: "You must give a valid langage code." })
        }
        
        const categories = await Category.findAll(
            {
                include: {
                    association: Category.associations.categories,
                    where: {
                        idLangage: {
                            [Op.eq]: langage
                        }
                    },
                    attributes: [
                        ['idCategory', 'id'],
                        'text',
                    ]
                },
                attributes: []
            }
        )

        if(categories.length) {
            const tcategories : Array<TCategory | undefined> = []
            for(const category of categories) {
                tcategories.push(category.categories?.at(0))
            }
            return res.status(200).json(tcategories)
        }
        else
            return res.status(404).json({ message: "No Author found." })

    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

const getCategory = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
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

        let category : Category | null = null
        if(id) {
            category = await Category.findOne(
                {
                    where: {
                        id: Number(id)
                    },
                    include: {
                        association: Category.associations.categories,
                        where: {
                            idLangage: {
                                [Op.eq]: langage
                            },
                        },
                        attributes: [
                            ['idCategory', 'id'],
                            'text',
                        ]
                    },
                    attributes: []
                }
            )
        }
        else if(text) {
            category = await Category.findOne(
                {
                    include: {
                        association: Category.associations.categories,
                        where: {
                            idLangage: {
                                [Op.eq]: langage
                            },
                            text: {
                                [Op.eq]: text
                            }
                        },
                        attributes: [
                            ['idCategory', 'id'],
                            'text',
                        ]
                    },
                    attributes: []
                }
            )
        }
        else
            return res.status(400).json({ message: "You must give at least one of the following parameter [id, text]" })
        
        if(category) {
            const tcategory : TCategory | undefined = category.categories?.at(0)
            return res.status(200).json(tcategory)
        }
        else
            return res.status(404).json({ message: "No Category found." })

    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

export { getCategories, getCategory }