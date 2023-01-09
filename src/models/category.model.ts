import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import { quizz as sequelize } from '../database/database'
import { Langage } from "./langage.model";

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: CreationOptional<number>;

    declare getCategories : HasManyGetAssociationsMixin<TCategory>
    declare createCategory: HasManyCreateAssociationMixin<TCategory, 'idCategory'>

    declare categories?: NonAttribute<TCategory[]>

    declare static associations: { 
        categories: Association<Category, TCategory>; 
    };
}

export class TCategory extends Model<InferAttributes<TCategory>, InferCreationAttributes<TCategory>> {
    declare idCategory: ForeignKey<Category['id']>;
    declare idLangage: ForeignKey<Langage['id']>;
    declare text: string;

    declare owner?: NonAttribute<Category>
    declare langage?: NonAttribute<Langage>

    declare static associations: { 
        owner: Association<TCategory, Category>; 
        langage: Association<TCategory, Langage>;
    };
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
}, {
    sequelize,
    tableName: 'q_category'
});

TCategory.init({
    idLangage: {
        type: DataTypes.INTEGER,
        unique: 'compositeTCategory'
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'compositeTCategory',
    }
}, {
    sequelize,
    tableName: 'q_t_category'
});