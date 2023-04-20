'use strict';
const pool = require("../Db");
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const sql =`SELECT * FROM wop_user ` ;
        const [rows] = await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const getUserById = async (id) => {
    try {
        const sql =` SELECT wop_user. * from wop_user where user_id=?`;
        const [rows] = await promisePool.query(sql,[id]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const insertUser = async (user) => {
    try {
        const sql =` INSERT INTO wop_user VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [rows] = await promisePool.query(sql,[
            null,
            user.name,
            user.surname,
            user.email,
            user.password,
            user.filename,
            user.role,
        ]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql insert user failed');
    }
};

const modifyUser = async (user) => {
    try {
        const sql =`UPDATE wop_user SET name=?, surname=?, email=?, password=?, filename=?,
        where user_id=?`;
        const [rows] = await promisePool.query(sql,[
            user.name,
            user.surname,
            user.email,
            user.password,
            user.filename,
            user.id

        ]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql update user failed');
    }
};

const deleteUser = async (id) => {
    try {
        const sql =`DELETE FROM wop_user where user_id=?`;
        const [rows] = await promisePool.query(sql,[id]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql delete user failed');
    }
};

const getUserLogin = async (email) => {
    try {
        console.log(email);
        const [rows] = await promisePool.execute(
            'SELECT * FROM wop_user WHERE email = ?;',
            [email]);
        console.log('get user login rows', rows);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    modifyUser,
    deleteUser,
    getUserLogin,
};
