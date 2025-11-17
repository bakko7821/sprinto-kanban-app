import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import User from "./User";

interface NotificationAttrs {
  id: number;
  content: string;
  read: boolean;
  userId: number;
}

interface NotificationCreation extends Optional<NotificationAttrs, "id" | "read"> {}

class Notification extends Model<NotificationAttrs, NotificationCreation>
  implements NotificationAttrs {
  public id!: number;
  public content!: string;
  public read!: boolean;
  public userId!: number;
}

Notification.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
    read: { type: DataTypes.BOOLEAN, defaultValue: false },

    // foreign key
    userId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: "notification",
    tableName: "notifications"
  }
);

export default Notification;
