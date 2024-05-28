import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 },
  fileFilter(req, file, cb) {
    try {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        // upload only png and jpg format
        return cb(new Error("Please upload a Image"));
      }
      cb(undefined, true);
    } catch (error) {
      res.status(500).json({ msg: "Internal server error", status: 500 });
    }
  },
});

export { upload };
