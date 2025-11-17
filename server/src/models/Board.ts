import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

interface BoardAttrs {
  id: number;
  name: string;
  backgroundImage: string;
  isPrivate: boolean;
  ownerId: number;
}

interface BoardCreation extends Optional<BoardAttrs, "id"> {}

class Board extends Model<BoardAttrs, BoardCreation> implements BoardAttrs {
  public id!: number;
  public name!: string;
  public backgroundImage!: string;
  public isPrivate!: boolean;
  public ownerId!: number;
}

Board.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    backgroundImage: DataTypes.STRING,
    isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "board",
    tableName: "boards"
  }
);

export default Board;
