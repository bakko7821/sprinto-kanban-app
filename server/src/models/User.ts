import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Board } from "../utils/types";

class User extends Model {
  public id!: number;
  public username!: string;
  public avatarImage!: string;
  public email!: string;
  public password!: string;

  public subcsribe!: boolean;
  public online!: boolean;

  public canvas!: Board[];
  public teams!: any[];
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        avatarImage: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        subcsribe: { type: DataTypes.BOOLEAN, defaultValue: false },
        online: { type: DataTypes.BOOLEAN, defaultValue: false },
        canvas: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
        teams: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: true,
        schema: "public",
    }
);

export default User;
