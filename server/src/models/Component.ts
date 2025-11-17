import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface ComponentAttrs {
  id: number;
  name: string;
  boardId: number;
}

interface ComponentCreation extends Optional<ComponentAttrs, "id"> {}

class Component extends Model<ComponentAttrs, ComponentCreation> {
  public id!: number;
  public name!: string;
  public boardId!: number;
}

Component.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    boardId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "component",
    tableName: "components"
  }
);

export default Component;
