import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hashing
  return hashedPassword;
}

export async function comparePassword(password,hashedPassword){
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}