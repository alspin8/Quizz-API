import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { quizz as sequelize } from '../database/database' 

export class Level extends Model<InferAttributes<Level>, InferCreationAttributes<Level>> {
    declare id: CreationOptional<number>;
    declare value: number;
}

Level.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: 'q_level'
});