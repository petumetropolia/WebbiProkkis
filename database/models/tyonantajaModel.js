'use strict';
const pool = require("../Db");
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const sql =`SELECT * FROM Työnantaja ` ;
        const [rows] = await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const getUserById = async (id) => {
    try {
        const sql =` SELECT Työnantaja. * from Työnantaja where y-tunnus=?`;
        const [rows] = await promisePool.query(sql,[id]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const insertUser = async (user) => {
    try {
        const sql =` INSERT INTO Työnantaja VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [rows] = await promisePool.query(sql,[
            user.yTunnus,
            user.name,
            user.email,
            user.description,
            user.filename,
            user.password,
            user.profession,

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

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    modifyUser,
    deleteUser
};
