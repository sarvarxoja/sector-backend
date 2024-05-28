import UserModel from "../Model/users.model.js";

export default {
  async getUsers(req, res) {
    try {
      let userData = await UserModel.findAll();

      if (!userData.length) {
        return res.json(null);
      }

      res.status(200).json({ userData });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },

  async userDelete(req, res) {
    try {
      let { id } = req.params;
      console.log(id);

      let data = await UserModel.destroy({ where: { id: id } })
        .then((e) => res.json(e))
        .catch((error) => res.status(501).json({ message: error.message }));
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
};
