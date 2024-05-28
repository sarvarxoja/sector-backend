import UserModel from "../Model/users.model.js";
import { comparePassword, encodePassword } from "../utils/bcrypt.js";
import { jwtSign } from "../utils/jwt.js";

export default {
  async authLogin(req, res) {
    try {
      let { username, password } = req.body;

      let data = await UserModel.findOne({ where: { username: username } });
      if (data) {
        let check_password = await comparePassword(password, data.password);
        if (check_password) {
          return res.status(200).json({
            id: data.id,
            username: data.username,
            name: data.name,
            status: 200,
            access_token: await jwtSign(data.id),
          });
        }
        if (!check_password) {
          return res.status(401).json({
            msg: "wrong username or password",
            status: 401,
          });
        }
      }
      if (!data) {
        return res.status(401).json({
          msg: "wrong username or password",
          status: 401,
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
  async authRegister(req, res) {
    try {
      let { username, password, name } = req.body;
      password = await encodePassword(password);

      let userData = await UserModel.create({
        username: username,
        password: password,
        name: name,
      });

      res.status(201).json({
        msg: "data successful created",
        status: 201,
        access_token: await jwtSign(userData.id),
        userData,
      });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
};
