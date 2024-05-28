import * as bcrypt from "bcrypt";

export async function encodePassword(password) {
  try {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", status: 500 });
  }
}

export async function comparePassword(rawPassword, hash) {
  try {
    return bcrypt.compareSync(rawPassword, hash);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", status: 500 });
  }
}
