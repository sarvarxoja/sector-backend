import jwt from "jsonwebtoken";
import UserModel from "../Model/users.model.js";

export default {
  async checkAdminToken(req, res, next) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ where: { id: payload.id } });

        if (!userData) {
          return res.status(401).json({ msg: "invalide token", status: 401 });
        }

        if (userData.is_admin !== true) {
          return res
            .status(401)
            .json({ msg: "You have no right to do so", status: 401 });
        }

        return next();
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ msg: "invalide token", status: 401 });
      }
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
  async checkSuperAdminToken(req, res, next) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ where: { id: payload.id } });

        if (!userData) {
          return res.status(401).json({ msg: "invalide token", status: 401 });
        }

        if (userData.super_admin !== true) {
          return res
            .status(401)
            .json({ msg: "You have no right to do so", status: 401 });
        }

        return next();
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ msg: "invalide token", status: 401 });
      }
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },

  async checkToken(req, res) {
    try {
      let { access_token } = req.headers;
      const SECRET_KEY = process.env.SECRET_KEY;

      const payload = jwt.verify(access_token, SECRET_KEY);

      if (payload) {
        let userData = await UserModel.findOne({ where: { id: payload.id } });

        if (!userData) {
          return res.json(false);
        }

        if (userData.is_admin !== true) {
          return res.json(false);
        }

        return res.json(true);
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.json(false);
      }
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
};
