import { Sequelize } from "sequelize";

export default class Database {
    database: Sequelize
    constructor() {
        this.database = new Sequelize(
            {
                dialect: "sqlite",
                storage: "database/db.sqlite",
                logQueryParameters: true,
            }
        )
        this.database.authenticate().then(() => {
            console.log('Connection has been established successfully.')
        }).catch(err => {
            console.error('Unable to connect to the database :', err)
        })

        this.database.sync({
        })
    }
}