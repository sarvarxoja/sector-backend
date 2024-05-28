import UserModel from "../Model/users.model.js";

export default {
  async registerMiddleware(req, res, next) {
    try {
      let { username, password, name } = req.body;

      let users = await UserModel.findAll();

      let check_username = users.find(
        (user) => user.username.toLowerCase() == username.toLowerCase()
      );

      if (check_username) {
        return res.status(409).json({
          msg: "this username already exists",
          status: 409,
        });
      }

      if (!username || !password || !name) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq emas", status: 400 });
      }

      if (
        username.length > 20 ||
        username.length < 4 ||
        !isNaN(username) ||
        /[@#!$%^&*:'" "]/g.test(username)
      ) {
        return res.status(400).json({ msg: "invalide username", status: 400 });
      }

      if (!isNaN(name) || name.length > 20 || name.length < 4) {
        return res.status(400).json({ msg: "invalide name", status: 400 });
      }

      if (!isNaN(password) || password.length > 15 || password.length < 4) {
        return res.status(400).json({ msg: "invalide password", status: 400 });
      }

      return next();
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },

  checkLogin(req, res, next) {
    try {
      let { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq kiritilmagan", staus: 400 });
      }

      return next();
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
};
