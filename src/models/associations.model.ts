import { Author } from "./auhtor.model"
import { Category, TCategory } from "./category.model"
import { CQM } from "./cqm.model"
import { Difficulty, TDifficulty } from "./difficulty.model"
import { Langage } from "./langage.model"
import { Level } from "./level.model"
import { Quizz, TQuizz } from "./quizz.model"


Langage.hasMany(TDifficulty, { sourceKey: 'id', foreignKey: { name: 'idLangage', allowNull: false } })
Langage.hasMany(TCategory, { sourceKey: 'id', foreignKey: { name: 'idLangage', allowNull: false } })
Langage.hasMany(TQuizz, { sourceKey: 'id', foreignKey: { name: 'idLangage', allowNull: false }, as: 'quizzs' })

Difficulty.hasMany(TDifficulty, { sourceKey: 'id', foreignKey: { name: 'idDifficulty', allowNull: false }, as: 'difficulties' })
Difficulty.hasMany(CQM, { sourceKey: 'id', foreignKey: { name: 'idDifficulty', allowNull: false } })

Category.hasMany(TCategory, { sourceKey: 'id', foreignKey: { name: 'idCategory', allowNull: false }, as: 'categories' })
Category.hasMany(Quizz, { sourceKey: 'id', foreignKey: { name: 'idCategory', allowNull: false } })

Level.hasMany(Quizz, { sourceKey: 'id', foreignKey: { name: 'idLevel', allowNull: false } })

Author.hasMany(Quizz, { sourceKey: 'id', foreignKey: { name: 'idAuthor', allowNull: false }, as: 'quizzs' })

Quizz.hasMany(TQuizz, { sourceKey: 'id', foreignKey: { name: 'idQuizz', allowNull: false }, as: 'quizzs' })

TQuizz.hasMany(CQM, { sourceKey: 'id', foreignKey: { name: 'idTQuizz', allowNull: false }, as: 'cqms' })


TDifficulty.belongsTo(Langage, { targetKey: 'id', foreignKey : { name: 'idLangage', allowNull: false }, as: 'langage' })
TDifficulty.belongsTo(Difficulty, { targetKey: 'id', foreignKey: { name: 'idDifficulty', allowNull: false }, as: 'owner' })

TCategory.belongsTo(Langage, { targetKey: 'id', foreignKey : { name: 'idLangage', allowNull: false }, as: 'langage' })
TCategory.belongsTo(Category, { targetKey: 'id', foreignKey: { name: 'idCategory', allowNull: false }, as: 'owner' })

CQM.belongsTo(Difficulty, { targetKey: 'id', foreignKey: { name: 'idDifficulty', allowNull: false }, as: 'difficulty' })
CQM.belongsTo(TQuizz, { targetKey: 'id', foreignKey: { name: 'idTQuizz', allowNull: false }, as: 'owner' })

Quizz.belongsTo(Level, { targetKey: 'id', foreignKey: { name: 'idLevel', allowNull: false }, as: 'level' })
Quizz.belongsTo(Category, { targetKey: 'id', foreignKey: { name: 'idCategory', allowNull: false }, as: 'category' })
Quizz.belongsTo(Author, { targetKey: 'id', foreignKey: { name: 'idAuthor', allowNull: false }, as: 'author' })

TQuizz.belongsTo(Langage, { targetKey: 'id', foreignKey : { name: 'idLangage', allowNull: false }, as: 'langage' })
TQuizz.belongsTo(Quizz, { targetKey: 'id', foreignKey: { name: 'idQuizz', allowNull: false }, as: 'owner' })