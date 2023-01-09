import { Sequelize, Transaction } from "sequelize"
import { sqlLogger } from "../utils/logger";

const quizz : Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'assets/database/quizz.db',
    logging: val => sqlLogger.info(val),
    transactionType: Transaction.TYPES.IMMEDIATE,
});

const test : Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'assets/database/test.db',
    logging: false,
});

export { quizz, test }