import { DataTypes, Model } from "sequelize";
import db from "../../config/database.config";

interface ToDoAttributes {
    id: string
    title: string
    completed: boolean
}

export class ToDoInstance extends Model<ToDoAttributes> { }

ToDoInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    sequelize: db,
    tableName: "todos"
})