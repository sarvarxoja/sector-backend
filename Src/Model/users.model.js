import { DataTypes, Model } from "sequelize";
import newSequlize from "../Config/index.js";

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    super_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "admin_users_table",
  }
);

UserModel.sync({ alter: true });

export default UserModel;
