const pool = require("../../config/database");

const addUserProfileDetailsQuery = async (userData) => {
    return await pool.query(
        `INSERT INTO user_profile
        (user_id, name, date_of_birth, country, state, city, occupation, timezone, currency, avatar_url)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
            userData.userId,
            userData.name,
            userData.dateOfBirth,
            userData.country,
            userData.state,
            userData.city,
            userData.occupation,
            userData.timezone,
            userData.currency,
            userData.avatarUrl,
        ]
    )
}

module.exports = { addUserProfileDetailsQuery }