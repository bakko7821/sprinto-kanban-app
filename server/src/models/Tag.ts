import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../config/db";

interface TagAttrs {
  id: number;
  name: string;
  color: string;
}

interface TagCreation extends Optional<TagAttrs, "id"> {}

export class Tag extends Model<TagAttrs, TagCreation> implements TagAttrs {
  id!: number;
  name!: string;
  color!: string;
}

Tag.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    color: DataTypes.STRING,
  },
  { sequelize, modelName: "tag" }
);

export default Tag