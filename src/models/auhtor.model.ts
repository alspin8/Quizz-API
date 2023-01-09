import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, Association } from "sequelize";
import { quizz as sequelize } from '../database/database' 
import { Quizz } from "./quizz.model";

export class Author extends Model<InferAttributes<Author>, InferCreationAttributes<Author>> {
    declare id: CreationOptional<number>;
    declare first: string;
    declare last: string;

    get fullname(): NonAttribute<string> {
        return `${this.first} ${this.last}`
    }

    declare quizzs?: NonAttribute<Quizz[]>

    declare static associations: {
        quizzs: Association<Author, Quizz>; 
    };
}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeName'
    },
    last: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeName'
    }
}, {
    sequelize,
    tableName: 'q_author',
});