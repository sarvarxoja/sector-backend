import { DataTypes, Model } from "sequelize";
import newSequlize from "../Config/index.js";

class ProductModel extends Model {}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    product_bio: {
      type: DataTypes.STRING(600),
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
    },

    product_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "products_table",
    timestamps: true,
  }
);

ProductModel.sync({ alter: true });

export default ProductModel;
