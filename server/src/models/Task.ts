import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface TaskAttrs {
  id: number;
  name: string;
  deadline: string;
  isDone: boolean;
  isArchive: boolean;
  columnId: number;
  executorIds: number[];
  tags: number[];
}

interface TaskCreation extends Optional<TaskAttrs, "id"> {}

class Task extends Model<TaskAttrs, TaskCreation> {
  public id!: number;
  public name!: string;
  public isDone!: boolean;
  public isArchive!: boolean; 
  public deadline!: string;
  public columnId!: number;
  public executorIds!: number[];
  public tags!: number[];
}

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    deadline: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    isArchive: DataTypes.BOOLEAN,
    columnId: { type: DataTypes.INTEGER, allowNull: false },

    executorIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: []
    },

    tags: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: "task",
    tableName: "tasks"
  }
);

export default Task;
