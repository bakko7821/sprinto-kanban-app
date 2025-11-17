import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface ColumnAttrs {
  id: number;
  name: string;
  boardId: number;
}

interface ColumnCreation extends Optional<ColumnAttrs, "id"> {}

class Column extends Model<ColumnAttrs, ColumnCreation> {
  public id!: number;
  public name!: string;
  public boardId!: number;
}

Column.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    boardId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "column",
    tableName: "columns"
  }
);

export default Column;
