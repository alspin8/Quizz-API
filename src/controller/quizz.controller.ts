import { Request, Response } from "express";
import { BaseError, Op } from "sequelize";
import { CQM } from "../models/cqm.model";
import { Quizz, TQuizz } from "../models/quizz.model";
import { Difficulty, TDifficulty } from "../models/difficulty.model";
import { logger } from "../utils/logger";
import { Category, TCategory } from "../models/category.model";

// const getQuizzsByLangage = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     let { langage } = req.params
//     try {

//         if(isNaN(Number(langage))) {            
//             const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
//             if(idLangage)
//                 langage = idLangage.get().id.toString()
//             else
//                 return res.status(400).json({ message: "You must give a valid langage code." })
//         }

//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         include: [
//                             {
//                                 association: Category.associations.categories,
//                                 where: {
//                                     idLangage: {
//                                         [Op.eq]: langage 
//                                     }
//                                 },
//                                 attributes: ['text']
//                             }
//                         ],
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         attributes: ['value']
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         attributes: ['first', 'last']
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         where: {
//                             idLangage: {
//                                 [Op.eq]: langage
//                             }
//                         },
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code']
//                             }
//                         ],
//                         attributes: ['name']
//                     }
//                 ],
//                 attributes: ['id']
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

// const getQuizzsByCategory = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     const { idCategory } = req.params
//     try {
//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         where: {
//                             id: {
//                                 [Op.eq]: idCategory 
//                             }
//                         },
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         attributes: ['value']
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         attributes: ['first', 'last']
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code']
//                             },
//                             {
//                                 association: TQuizz.associations.cqms,
//                                 where: {
//                                     idTQuizz: {
//                                         [Op.ne]: null
//                                     }
//                                 },
//                                 attributes: []
//                             }
//                         ],
//                         attributes: ['name'], 
//                     }
//                 ],
//                 attributes: ['id'],
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

// const getQuizzsByAuthor = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     const { idAuthor } = req.params
//     try {
//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         attributes: ['value']
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         where: {
//                             id: {
//                                 [Op.eq]: idAuthor 
//                             }
//                         },
//                         attributes: ['first', 'last']
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code']
//                             },
//                             {
//                                 association: TQuizz.associations.cqms,
//                                 where: {
//                                     idTQuizz: {
//                                         [Op.ne]: null
//                                     }
//                                 },
//                                 attributes: []
//                             }
//                         ],
//                         attributes: ['name'], 
//                     }
//                 ],
//                 attributes: ['id'],
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

// const getQuizzsByLevel = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     const { idLevel } = req.params
//     try {
//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         where: {
//                             id: {
//                                 [Op.eq]: idLevel 
//                             }
//                         },
//                         attributes: ['value']
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         attributes: ['first', 'last']
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code']
//                             },
//                             {
//                                 association: TQuizz.associations.cqms,
//                                 where: {
//                                     idTQuizz: {
//                                         [Op.ne]: null
//                                     }
//                                 },
//                                 attributes: []
//                             }
//                         ],
//                         attributes: ['name'], 
//                     }
//                 ],
//                 attributes: ['id'],
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

// const getQuizzsByCategoryAndLangage = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     const { idCategory } = req.params
//     let { langage } = req.params
    
//     try {
//         if(isNaN(Number(langage))) {            
//             const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
//             if(idLangage)
//                 langage = idLangage.get().id.toString()
//             else
//                 return res.status(400).json({ message: "You must give a valid langage code." })
//         }

//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         where: {
//                             id: {
//                                 [Op.eq]: idCategory 
//                             }
//                         },
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         attributes: ['id']
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         attributes: ['id']
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         where: {
//                             idLangage: {
//                                 [Op.eq]: langage
//                             }
//                         },
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code'],
//                             },
//                             {
//                                 association: TQuizz.associations.cqms,
//                                 where: {
//                                     idTQuizz: {
//                                         [Op.ne]: null
//                                     }
//                                 },
//                                 attributes: []
//                             }
//                         ],
//                         attributes: ['name'], 
//                     }
//                 ],
//                 attributes: ['id'],
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

// const getQuizzsByLevelAndLangage = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     const { idLevel } = req.params
//     let { langage } = req.params
    
//     try {
//         if(isNaN(Number(langage))) {            
//             const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
//             if(idLangage)
//                 langage = idLangage.get().id.toString()
//             else
//                 return res.status(400).json({ message: "You must give a valid langage code." })
//         }

//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         attributes: ['id']
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         where: {
//                             id: {
//                                 [Op.eq]: idLevel 
//                             }
//                         },
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         attributes: ['id']
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         where: {
//                             idLangage: {
//                                 [Op.eq]: langage
//                             }
//                         },
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code'],
//                             },
//                             {
//                                 association: TQuizz.associations.cqms,
//                                 where: {
//                                     idTQuizz: {
//                                         [Op.ne]: null
//                                     }
//                                 },
//                                 attributes: []
//                             }
//                         ],
//                         attributes: ['name'], 
//                     }
//                 ],
//                 attributes: ['id'],
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

// const getQuizzsByAuthorAndLangage = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
//     const { idAuthor } = req.params
//     let { langage } = req.params
    
//     try {
//         if(isNaN(Number(langage))) {            
//             const idLangage = await Langage.findOne({ where: { code: langage }, attributes: ['id'] })
//             if(idLangage)
//                 langage = idLangage.get().id.toString()
//             else
//                 return res.status(400).json({ message: "You must give a valid langage code." })
//         }

//         const quizzs = await Quizz.findAll(
//             { 
//                 include: [
//                     {
//                         association: Quizz.associations.category,
//                         attributes: ['id']
//                     },
//                     {
//                         association: Quizz.associations.level,
//                         attributes: ['id']
//                     },
//                     {
//                         association: Quizz.associations.author,
//                         where: {
//                             id: {
//                                 [Op.eq]: idAuthor 
//                             }
//                         },
//                         attributes: ['id'] 
//                     },
//                     {
//                         association: Quizz.associations.quizzs,
//                         where: {
//                             idLangage: {
//                                 [Op.eq]: langage
//                             }
//                         },
//                         include: [
//                             {
//                                 association: TQuizz.associations.langage,
//                                 attributes: ['id', 'code'],
//                             },
//                             {
//                                 association: TQuizz.associations.cqms,
//                                 where: {
//                                     idTQuizz: {
//                                         [Op.ne]: null
//                                     }
//                                 },
//                                 attributes: []
//                             }
//                         ],
//                         attributes: ['name'], 
//                     }
//                 ],
//                 attributes: ['id'],
//             }
//         )
//         if(quizzs.length)
//             return res.status(200).json(quizzs)
//         else
//             return res.status(404).json({ message: "No Quizz found." })
//     } catch (err) {
//         logger.error((err as BaseError).message)
//         return res.status(500).json({ error: err })
//     }
// }

interface Query {
    idsAuthor: string,
    idsCategory: string,
    idsLevel: string
}

const getQuizzs = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    const { langage } = req.params
    const { idsAuthor, idsCategory, idsLevel } = req.query as unknown as Query;

    const _idsAuthor : Array<number> = idsAuthor.slice(1, idsAuthor.length - 1).split(',').filter(r => r!== '').map(Number)
    const _idsCategories : Array<number> = idsCategory.slice(1, idsCategory.length - 1).split(',').filter(r => r!== '').map(Number)
    const _idsLevel : Array<number> = idsLevel.slice(1, idsLevel.length - 1).split(',').filter(r => r!== '').map(Number)
     
    try {
        const quizzs = await Quizz.findAll(
            { 
                include: [
                    {
                        association: Quizz.associations.category,
                        where: _idsCategories.length > 0 ? {
                            id: {
                                [Op.or]: _idsCategories.map( id => id)
                            }
                        } : undefined,
                        attributes: ['id'] 
                    },
                    {
                        association: Quizz.associations.level,
                        where: _idsLevel.length > 0 ? {
                            id: {
                                [Op.or]: _idsLevel.map( id => id) 
                            }
                        } : undefined,
                        attributes: ['id']
                    },
                    {
                        association: Quizz.associations.author,
                        where: _idsAuthor.length > 0 ? {
                            id: {
                                [Op.or]: _idsAuthor.map( id => id) 
                            }
                        } : undefined,
                        attributes: ['id']
                    },
                    {
                        association: Quizz.associations.quizzs,
                        where: {
                            idLangage: {
                                [Op.eq]: langage
                            }
                        },
                        include: [
                            {
                                association: TQuizz.associations.langage,
                                attributes: ['id', 'code'],
                            },
                            {
                                association: TQuizz.associations.cqms,
                                where: {
                                    idTQuizz: {
                                        [Op.ne]: null
                                    }
                                },
                                attributes: []
                            }
                        ],
                        attributes: ['name'], 
                    }
                ],
                attributes: ['id'],
            }
        )
        
        if(quizzs.length)
            return res.status(200).json(quizzs)
        else
            return res.status(404).json({ message: "No Quizz found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

const getQuizz = async(req: Request, res: Response) : Promise<Response<any, Record<string, any>>> => {
    const { langage, quizz } = req.params

    try {
        const quizzs = await Quizz.findOne(
            { 
                where: {
                    id: {
                        [Op.eq]: quizz
                    }
                },
                include: [
                    {
                        association: Quizz.associations.category,
                        include: [
                            {
                                association: Category.associations.categories,
                                include : [
                                    {
                                        association: TCategory.associations.langage,
                                        where: {
                                            id: {
                                                [Op.eq]: langage
                                            }
                                        },
                                        attributes: []
                                    }
                                ],
                                attributes: ['text'],
                            }
                        ],
                        attributes: ['id'] 
                    },
                    {
                        association: Quizz.associations.level,
                        attributes: ['id', 'value']
                    },
                    {
                        association: Quizz.associations.author,
                        attributes: ['id', 'first', 'last']
                    },
                    {
                        association: Quizz.associations.quizzs,
                        where: {
                            idLangage: {
                                [Op.eq]: langage
                            }
                        },
                        include: [
                            {
                                association: TQuizz.associations.langage,
                                attributes: ['id', 'code'],
                            },
                            {
                                association: TQuizz.associations.cqms,
                                where: {
                                    idTQuizz: {
                                        [Op.ne]: null
                                    }
                                },
                                include: [
                                    {
                                        association: CQM.associations.difficulty,
                                        include: [
                                            {
                                                association: Difficulty.associations.difficulties,
                                                include: [
                                                    {
                                                        association: TDifficulty.associations.langage,
                                                        where: {
                                                            id: {
                                                                [Op.eq]: langage
                                                            }
                                                        },
                                                        attributes: []
                                                        
                                                    }
                                                ],
                                                attributes: ['text']
                                            }
                                        ],
                                        attributes: ['id'],
                                    }
                                ]
                            }
                        ],
                        attributes: ['name', 'slogan'], 
                    }
                ],
                attributes: ['id'],
                order: [
                    [
                        Quizz.associations.quizzs,
                        TQuizz.associations.cqms,
                        CQM.associations.difficulty,
                        'id',
                        'ASC'
                    ]
                ]
            }
        )
        
        if(quizzs) {
            return res.status(200).json(quizzs)
        }
        else
            return res.status(404).json({ message: "No Quizz found." })
    } catch (err) {
        logger.error((err as BaseError).message)
        return res.status(500).json({ error: err })
    }
}

export { 
    getQuizzs,
    getQuizz
}