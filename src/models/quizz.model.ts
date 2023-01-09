import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, Options, HasManyCreateAssociationMixinOptions } from "sequelize";
import { quizz as sequelize } from '../database/database'
import { Author } from "./auhtor.model";
import { Category } from "./category.model";
import { CQM } from "./cqm.model";
import { Langage } from "./langage.model";
import { Level } from "./level.model";

export class Quizz extends Model<InferAttributes<Quizz>, InferCreationAttributes<Quizz>> {
    declare id: CreationOptional<number>
    declare idLevel: ForeignKey<Level['id']>
    declare idCategory: ForeignKey<Category['id']>
    declare idAuthor: ForeignKey<Author['id']>

    declare getQuizzs : HasManyGetAssociationsMixin<TQuizz>
    declare createQuizz: HasManyCreateAssociationMixin<TQuizz, 'idQuizz'>

    declare quizzs?: NonAttribute<TQuizz[]>

    declare level?: NonAttribute<Level>
    declare category: NonAttribute<Category>
    declare author: NonAttribute<Author>

    declare static associations: { 
        quizzs: Association<Quizz, TQuizz>; 
        level: Association<Quizz, Level>
        category: Association<Quizz, Category>
        author: Association<Quizz, Author>
    };
}

export class TQuizz extends Model<InferAttributes<TQuizz>, InferCreationAttributes<TQuizz>> {
    declare id: CreationOptional<number>
    declare idQuizz: ForeignKey<Quizz['id']>;
    declare idLangage: ForeignKey<Langage['id']>;
    declare name: string
    declare slogan: string

    declare getCQMs: HasManyGetAssociationsMixin<CQM>
    declare createCqm: HasManyCreateAssociationMixin<CQM, 'idTQuizz'>

    declare cqms: NonAttribute<CQM[]>

    declare owner?: NonAttribute<Quizz>
    declare langage?: NonAttribute<Langage>

    declare static associations: { 
        cqms: Association<TQuizz, CQM>
        owner: Association<TQuizz, Quizz>; 
        langage: Association<TQuizz, Langage>;
    };
}

Quizz.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    sequelize,
    tableName: 'q_quizz'
});

TQuizz.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slogan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
}, {
    sequelize,
    tableName: 'q_t_quizz'
});