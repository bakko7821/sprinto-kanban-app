import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from "../config/db";

interface TagAttrs {
  id: number;
  name: string;
  color: string;
  ownerId: number;
}

interface TagCreation extends Optional<TagAttrs, "id"> {}

export class Tag extends Model<TagAttrs, TagCreation> implements TagAttrs {
  id!: number;
  name!: string;
  color!: string;
  ownerId!: number;
}

Tag.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  },
  { sequelize, modelName: "tag" }
);

export default Tag