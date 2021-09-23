import Database from "../config/db";
import Sequelize from "sequelize"

export interface UserAttributes {
    id: number;
    username: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Sequelize.Optional<UserAttributes, "id"> { }

export class User extends Sequelize.Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public username!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new Sequelize.DataTypes.STRING(128),
            allowNull: false,
        }
    },
    {
        tableName: "users",
        sequelize: new Database().database
    }
);
