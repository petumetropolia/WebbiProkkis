'use strict';
const pool = require("../Db");
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const sql =`SELECT user_id, name, email, password FROM wop_user` ;
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
            user.role
        ]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql insert user failed');
    }
};


const modifyUser = async (user) => {
    try {
        const sql =`UPDATE wop_user SET name=?, email=?, passwd=?,
        where user_id=?`;
        const [rows] = await promisePool.query(sql,[
            user.name,
            user.email,
            user.passwd,
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

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    modifyUser,
    deleteUser
};
