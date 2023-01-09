import fs, { Dirent } from 'fs'
import path from 'path'

import { sqlLogger } from '../utils/logger'

import { quizz as sequelize } from "./database"
import "../models/auhtor.model"
import "../models/category.model"
import "../models/difficulty.model"
import "../models/langage.model"
import "../models/level.model"
import "../models/quizz.model"
import "../models/cqm.model"
import "../models/associations.model"
import { Author } from "../models/auhtor.model"
import { Category } from "../models/category.model"
import { Difficulty } from "../models/difficulty.model"
import { Langage } from "../models/langage.model"
import { Level } from "../models/level.model"
import { Quizz, TQuizz } from '../models/quizz.model'
import { Op } from 'sequelize'

const createAndFillDatabase = async() : Promise<void> => {
    await sequelize.sync({ 
        force: false, 
        logging: (val, timing) => sqlLogger.info(val) 
    });

    const langage_text : Array<string> = ["fr", "en", "es", "it", "de", "nl"]
    for(const text of langage_text) {
        await Langage.findOrCreate({ where: { code: text } })
    }
    const langages : Array<Langage> = await Langage.findAll()

    const difficulty_text : Array<Array<string>> = 
    [
        ["Débutant", "Beginner", "Principiante", "Principianti", "Anfänger", "Beginner"],
        ["Confirmé", "Confirmed", "Confirmado", "Confermato", "Bestätigt", "Bevestigd"],
        ["Expert", "Expert", "Experto", "Esperto", "Experte", "Deskundige"],
    ]
    for(const [textIndex, text] of difficulty_text.entries()) {
        await Difficulty.create( 
            {
                id: textIndex
            }, 
            { 
                ignoreDuplicates: true, 
                include: [Difficulty.associations.difficulties] 
            }
        )
    }
    const difficulties : Array<Difficulty> = await Difficulty.findAll()
    for(const [difficultyIndex, difficulty] of difficulties.entries()) {
        for(const [langageIndex, langage] of langages.entries()) {
            await difficulty.createDifficulty({ 
                idLangage: langage.get().id, 
                text: difficulty_text[difficultyIndex][langageIndex] 
            }, { 
                ignoreDuplicates: true 
            })
        }
    }
    
    for (let index = 0; index <= 5; index++) {
        await Level.create({ value: index }, { ignoreDuplicates: true })
    }
}

const getDataFiles = async() : Promise<Array<string>> => {
    const filesName : Array<string> = []
    const result : Array<Dirent> = await fs.promises.readdir(path.resolve('assets/data'), { withFileTypes: true })
    for(const res of result) {
        filesName.push(res.name)
    }
    return filesName
}

interface CNS {
    'catégorie': string
    nom: string
    slogan: string
}

interface Question {
    id: string
    question: string
    propositions: Array<string>
    'réponse': string
    anecdote: string
}

interface Questions {
    'débutant': Array<Question>
    'confirmé': Array<Question>
    expert: Array<Question>
}

interface QuizzData {
    fournisseur: string
    'rédacteur': string
    'difficulté': string
    version: string
    'mise-à-jour': string
    'catégorie-nom-slogan': {
        'fr': CNS
        'en': CNS
        'es': CNS
        'it': CNS
        'de': CNS
        'nl': CNS
    }
    quizz: {
        fr: Questions
        en: Questions
        es: Questions
        it: Questions
        de: Questions
        nl: Questions
    }

}

const addNewCategory = async(data : QuizzData, langages : Array<Langage>) : Promise<Category> => {
    const category = await Category.create({}, { include: [Category.associations.categories] })
    for(const langage of langages) {
        await category.createCategory(
                {
                    idLangage: langage.get().id,
                    text: (data['catégorie-nom-slogan'] as any)[langage?.get().code || 'en'].catégorie
                }
            )
    }
    return category
}

const addCqmsToQuizzByDifficulty = async(data : Array<Question>, tquizz : TQuizz, difficulty : Difficulty | null) : Promise<void> => {
    for(const cqm of data) {
        await tquizz.createCqm(
            {
                idDifficulty: difficulty?.get().id,
                question: cqm.question,
                answer1: cqm.propositions[0],
                answer2: cqm.propositions[1],
                answer3: cqm.propositions[2],
                answer4: cqm.propositions[3],
                rightAnswer: cqm.réponse,
                anecdote: cqm.anecdote
            }
        )
    }
}

const addNewQuizz = async(data : QuizzData, langages : Array<Langage>, en: Langage | null, category : Category | null, author : Author | null, level : Level | null) : Promise<void> => {
    try {
        const quizz = await Quizz.create(
            {
                idAuthor: author?.get().id,
                idCategory: category?.get().id,
                idLevel: level?.get().id,
            },
            {
                include: [Quizz.associations.quizzs]
            }
        )

        const beginner = await Difficulty.findOne(
            {
                include: {
                    association: Difficulty.associations.difficulties,
                    where: {
                        text: {
                            [Op.eq]: "Beginner"
                        },
                        idLangage: {
                            [Op.eq]: en?.get().id
                        }
                    }
                },
                attributes: ['id']
            }
        )

        const confirmed = await Difficulty.findOne(
            {
                include: {
                    association: Difficulty.associations.difficulties,
                    where: {
                        text: {
                            [Op.eq]: "Confirmed"
                        },
                        idLangage: {
                            [Op.eq]: en?.get().id
                        }
                    }
                },
                attributes: ['id']
            }
        )

        const expert = await Difficulty.findOne(
            {
                include: {
                    association: Difficulty.associations.difficulties,
                    where: {
                        text: {
                            [Op.eq]: "Expert"
                        },
                        idLangage: {
                            [Op.eq]: en?.get().id
                        }
                    }
                },
                attributes: ['id']
            }
        )

        for(const langage of langages) {
            const tquizz = await quizz.createQuizz(
                {
                    idLangage: langage.get().id,
                    name: (data['catégorie-nom-slogan'] as any)[langage?.get().code || 'en'].nom,
                    slogan: (data['catégorie-nom-slogan'] as any)[langage?.get().code || 'en'].slogan
                }, {
                    include: [TQuizz.associations.cqms]
                }
            )
            
            if((data.quizz as any)[langage?.get().code] !== undefined) {
                addCqmsToQuizzByDifficulty(
                    (data.quizz as any)[langage?.get().code].débutant,
                    tquizz,
                    beginner
                )

                addCqmsToQuizzByDifficulty(
                    (data.quizz as any)[langage?.get().code].confirmé,
                    tquizz,
                    confirmed
                )
    
                addCqmsToQuizzByDifficulty(
                    (data.quizz as any)[langage?.get().code].expert,
                    tquizz,
                    expert
                )
            }
        }
    } catch (err) {
        console.log(err);
    }

}

const initOrUpdateDatabase = async() : Promise<void> => {
    await createAndFillDatabase()

    const langages = await Langage.findAll()
    const en = await Langage.findOne({ where: { code: 'en' }, attributes: ['id'] })

    const filesName = await getDataFiles();
    
    for(const fileName of filesName) {
        const file = await fs.promises.readFile(path.resolve('assets/data').concat('/').concat(fileName))
        if(file) {
            const data : QuizzData = JSON.parse(file.toString());
            
            const quizz = await Quizz.findOne({
                include: {
                    association: Quizz.associations.quizzs,
                    where: {
                        idLangage: {
                            [Op.eq]: en?.get().id
                        },
                        name: {
                            [Op.eq]: data['catégorie-nom-slogan'].en.nom
                        },
                        slogan: {
                            [Op.eq]: data['catégorie-nom-slogan'].en.slogan
                        }
                    }
                }
            })
            if(!quizz) {
                let category = await Category.findOne({ 
                    include: {
                        association: Category.associations.categories,
                        where: {
                            text: {
                                [Op.eq]: data['catégorie-nom-slogan'].en.catégorie
                            },
                            idLangage: {
                                [Op.eq]: en?.get().id
                            }
                        }
                    }
                })
                if(!category) {
                    category = await addNewCategory(data, langages)
                }

                const [author] = await Author.findOrCreate(
                    { 
                        where: { 
                            first: data.rédacteur.split(' ').at(0),
                            last: data.rédacteur.split(' ').at(1)
                        },
                        attributes: ['id']
                    }
                )
    
                const [level] = await Level.findOrCreate(
                    {
                        where: {
                            value: {
                                [Op.eq]: data.difficulté.slice(0, 1)
                            }
                        }
                    }
                )
                await addNewQuizz(data, langages, en, category, author, level)
            }
        }
    }
    
}

export { initOrUpdateDatabase }