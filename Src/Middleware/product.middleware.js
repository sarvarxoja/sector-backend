export default {
  async checkProduct(req, res, next) {
    try {
      let { product_name, product_bio, product_type } = req.body;

      if (!product_name || !product_bio || !product_type || !req.file) {
        return res
          .status(400)
          .json({ msg: "ma'lumotlar toliq emas", status: 400 });
      }

      if (
        product_name.length > 200 ||
        product_name.length < 4 ||
        !isNaN(product_name) ||
        /[@#!$%^&*:']/g.test(product_name)
      ) {
        return res
          .status(400)
          .json({ msg: "invalide product_name", status: 400 });
      }

      if (
        product_type.length > 30 ||
        product_type.length < 2 ||
        !isNaN(product_type) ||
        /[@#!$%^&*:']/g.test(product_type)
      ) {
        return res
          .status(400)
          .json({ msg: "invalide product_type", status: 400 });
      }

      if (product_bio.length > 600 || product_bio.length < 10) {
        return res.status(400).json({
          msg: "product_bio uzunligi 4 dan katta 70 dan kichik bo'lishi kerak",
          status: 400,
        });
      }

      return next();
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
};
