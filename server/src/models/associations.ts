import User from "./User";
import Board from "./Board";
import Task from "./Task";
import Tag from "./Tag";
import Notification from "./Notification";
import Column from "./Column";

User.hasMany(Board, { foreignKey: "ownerId", as: "ownedBoards" });
Board.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

User.belongsToMany(Board, { through: "BoardUsers", as: "boards" });
Board.belongsToMany(User, { through: "BoardUsers", as: "users" });

Board.hasMany(Column, { foreignKey: "boardId", as: "columns" });
Column.belongsTo(Board, { foreignKey: "boardId" });

Column.hasMany(Task, { foreignKey: "columnId", as: "tasks" });
Task.belongsTo(Column, { foreignKey: "columntId" });

Task.belongsToMany(Tag, { through: "TaskTags", as: "tags" });
Tag.belongsToMany(Task, { through: "TaskTags", as: "tasks" });

User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId" });

export { User, Board, Column, Task, Tag, Notification };
