import { Sequelize } from "sequelize"

const db = new Sequelize({
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: true
})

export default db;