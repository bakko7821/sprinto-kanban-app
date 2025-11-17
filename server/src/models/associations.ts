import User from "./User";
import Board from "./Board";
import Component from "./Component";
import Task from "./Task";
import Tag from "./Tag";
import Notification from "./Notification";

User.hasMany(Board, { foreignKey: "ownerId", as: "ownedBoards" });
Board.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

User.belongsToMany(Board, { through: "BoardUsers", as: "boards" });
Board.belongsToMany(User, { through: "BoardUsers", as: "users" });

Board.hasMany(Component, { foreignKey: "boardId", as: "components" });
Component.belongsTo(Board, { foreignKey: "boardId" });

Component.hasMany(Task, { foreignKey: "componentId", as: "tasks" });
Task.belongsTo(Component, { foreignKey: "componentId" });

Task.belongsToMany(Tag, { through: "TaskTags", as: "tags" });
Tag.belongsToMany(Task, { through: "TaskTags", as: "tasks" });

User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId" });

export { User, Board, Component, Task, Tag, Notification };
