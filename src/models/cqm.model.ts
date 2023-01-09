import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, NonAttribute, Association } from "sequelize";
import { quizz as sequelize } from '../database/database' 
import { Difficulty } from "./difficulty.model";
import { TQuizz } from "./quizz.model";

export class CQM extends Model<InferAttributes<CQM>, InferCreationAttributes<CQM>> {
    declare idTQuizz: ForeignKey<TQuizz['id']>;
    declare idDifficulty: ForeignKey<Difficulty['id']>
    declare question: string;
    declare answer1: string;
    declare answer2: string;
    declare answer3: string;
    declare answer4: string;
    declare rightAnswer: string;
    declare anecdote: string;

    declare owner: NonAttribute<TQuizz>
    declare difficulty: NonAttribute<Difficulty>

    declare static associations: { 
        owner: Association<CQM, TQuizz>
        difficulty: Association<CQM, Difficulty>
    };
}

CQM.init({
    question: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    answer1: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    answer2: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    answer3: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    answer4: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    rightAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    },
    anecdote: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeQuizz'
    }
}, {
    sequelize,
    tableName: 'q_cqm'
});