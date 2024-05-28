import jwt from "jsonwebtoken";

export async function jwtSign(id) {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const expiresIn = 7 * 24 * 60 * 60;
    let jwtData = jwt.sign({ id: id }, SECRET_KEY, {
      expiresIn,
    });

    return jwtData;
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", status: 500 });
  }
}
