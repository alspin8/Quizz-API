import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, Options, HasManyCreateAssociationMixinOptions, HasManyHasAssociationMixin } from "sequelize";
import { quizz as sequelize } from '../database/database'
import { Langage } from "./langage.model";

export class Difficulty extends Model<InferAttributes<Difficulty>, InferCreationAttributes<Difficulty>> {
    declare id: CreationOptional<number>;

    declare getDifficulties : HasManyGetAssociationsMixin<TDifficulty>
    declare createDifficulty: HasManyCreateAssociationMixin<TDifficulty, 'idDifficulty'>
    // declare hasDifficulty: HasManyHasAssociationMixin<TDifficulty, number>

    declare difficulties?: NonAttribute<TDifficulty[]>

    declare static associations: { 
        difficulties: Association<Difficulty, TDifficulty>; 
    };
}

export class TDifficulty extends Model<InferAttributes<TDifficulty>, InferCreationAttributes<TDifficulty>> {
    declare idDifficulty: ForeignKey<Difficulty['id']>;
    declare idLangage: ForeignKey<Langage['id']>;
    declare text: string;

    declare owner?: NonAttribute<Difficulty>
    declare langage?: NonAttribute<Langage>

    declare static associations: { 
        owner: Association<TDifficulty, Difficulty>; 
        langage: Association<TDifficulty, Langage>;
    };
}

Difficulty.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    sequelize,
    tableName: 'q_difficulty'
});

TDifficulty.init({
    idLangage: {
        type: DataTypes.INTEGER,
        unique: 'compositeDifficulty', 
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "compositeDifficulty"
    }
}, {
    sequelize,
    tableName: 'q_t_difficulty',
});