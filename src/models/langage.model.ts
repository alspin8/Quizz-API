import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, Association } from "sequelize";
import { quizz as sequelize } from '../database/database' 
import { TQuizz } from "./quizz.model";

export class Langage extends Model<InferAttributes<Langage>, InferCreationAttributes<Langage>> {
    declare id: CreationOptional<number>;
    declare code: string;

    declare quizzs: NonAttribute<TQuizz[]>

    declare static associations: { 
        quizzs: Association<Langage, TQuizz>; 
    };
}

Langage.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: 'q_langage'
});