import { Op } from "sequelize";
import ProductModel from "../Model/products.model.js";

export default {
  async createProduct(req, res) {
    try {
      let { product_name, product_bio, product_type, price } = req.body;
      product_type = product_type.toLowerCase();

      let result = await ProductModel.create({
        product_img: `/${req.file.filename}`,
        product_name: product_name,
        product_type: product_type,
        product_bio: product_bio,
      });

      res
        .status(201)
        .json({ msg: "data successfully created", status: 201, result });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },

  // async findQuery(req, res) {
  //   try {
  //     const query = req.query;

  //     if (!query.page || !query.limit) {
  //       return res
  //         .status(400)
  //         .json({ msg: "ma'lumotlar toliq emas", status: 400 });
  //     }

  //     if (!Object.keys(query).length) {
  //       query.page = 1;
  //       query.limit = 10;
  //     }

  //     const data = await ProductModel.findAndCountAll({
  //       offset: (query.page - 1) * query.limit,
  //       limit: query.limit,
  //     });

  //     res.status(200).json({ data });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  //   }
  // },

  // async findQuery(req, res) {
  //   try {
  //     const data = await ProductModel.findAndCountAll();

  //     res.status(200).json({ data });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ data: "serverda xatolik ☹", status: 500 });
  //   }
  // },

  async findProduct(req, res) {
    try {
      let { name, type } = req.query;

      if (!name && !type) {
        const response = await ProductModel.findAndCountAll();
        const randomSort = () => {
          return response.rows.sort(() => Math.random() - 0.7);
        };

        const rows = randomSort();
        return res.status(200).json({ data: { count: response.count, rows } });
      }

      if (name) {
        let rows = await ProductModel.findAll({
          where: {
            product_name: {
              [Op.like]: `%${name}%`,
            },
          },
        });

        if (!rows.length) {
          return res
            .status(404)
            .json({ msg: "data is not found", status: 404 });
        }

        return res.status(200).json({ data: { rows } });
      }

      if (type) {
        let rows = await ProductModel.findAll({
          where: {
            product_type: {
              [Op.like]: `%${type}%`,
            },
          },
        });

        if (!rows.length) {
          return res
            .status(404)
            .json({ msg: "data is not found", status: 404 });
        }
        return res.status(200).json({ data: { rows } });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },

  async findProductId(req, res) {
    try {
      let { id } = req.params;
      let response = await ProductModel.findOne({ where: { id: id } });
      res.status(200).json({ response, status: 200 });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },

  async deleteProduct(req, res) {
    try {
      let { id } = req.params;

      let deleteData = await ProductModel.destroy({ where: { id: id } });

      if (deleteData === 0) {
        return res.status(404).json({ msg: "data not found", status: 404 });
      }

      res
        .status(200)
        .json({ msg: "successfully delete", status: 200, deleteData });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
};
