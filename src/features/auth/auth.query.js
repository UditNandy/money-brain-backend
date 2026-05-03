const pool = require("../../config/database");

const findUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const addNewUser = async (email, hashedPassword) => {
  return await pool.query(
    `INSERT INTO users (email, password, auth_provider)
       VALUES ($1, $2, 'local')
       RETURNING id, email`,
    [email, hashedPassword],
  );
};

module.exports = { findUserByEmail, addNewUser };
