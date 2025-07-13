const pool = require("./pool");

const selectAllUsers = async() => {
    const { rows } = await pool.query(`
        SELECT * FROM users;
        `)
    return rows;
}

const selectUserByEmail = async (email) => {
    const { rows } = await pool.query(`
        SELECT email FROM users WHERE email = $1
        `, [email])
    console.log(rows.email);
    return rows;
}

const insertUser = async(firstname, lastname, email, password) => {
    await pool.query(`
        INSERT INTO users ( first_name, last_name, email, password )
        VALUES ($1, $2, $3, $4)
        `, [firstname, lastname, email, password])
}

module.exports = {
    selectAllUsers,
    selectUserByEmail,
    insertUser
}

