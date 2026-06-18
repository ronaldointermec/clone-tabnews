import bcrypt from "bcryptjs";

async function hash(password) {
  // const salt = await bcrypt.genSalt(14);

  const rounds = getNumberOfRounds();
  const hashedPassword = await bcrypt.hash(password, rounds);
  return hashedPassword;
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  return await bcrypt.compare(providedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
