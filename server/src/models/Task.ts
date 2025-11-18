import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface TaskAttrs {
  id: number;
  name: string;
  deadline: string;
  isDone: boolean;
  columnId: number;
}

interface TaskCreation extends Optional<TaskAttrs, "id"> {}

class Task extends Model<TaskAttrs, TaskCreation> {
  public id!: number;
  public name!: string;
  public isDone!: boolean;
  public deadline!: string;
  public columnId!: number;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    deadline: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    columnId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "task",
    tableName: "tasks"
  }
);

export default Task;
