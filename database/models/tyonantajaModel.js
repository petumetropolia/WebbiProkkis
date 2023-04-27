'use strict';
const pool = require("../Db");
const promisePool = pool.promise();

const getAllTyonantaja = async () => {
    try {
        const sql =`SELECT * FROM Työnantaja ` ;
        const [rows] = await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const getTyonantajaById = async (id) => {
    try {
        const sql =` SELECT Työnantaja. * from Työnantaja where y-tunnus=?`;
        const [rows] = await promisePool.query(sql,[id]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const insertTyonantaja = async (user) => {
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


const modifyTyonantaja = async (user) => {
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


const deleteTyonantaja = async (id) => {
    try {
        const sql =`DELETE FROM wop_user where user_id=?`;
        const [rows] = await promisePool.query(sql,[id]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql delete user failed');
    }
};

const getTyonantajaLogin = async (email) => {
    try {
        console.log(email);
        const [rows] = await promisePool.execute(
            'SELECT * FROM Työntekijä WHERE `sähköposti` = ?;',
            [email]);
        console.log('get user login rows', rows);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

module.exports = {
    getAllTyonantaja,
    getTyonantajaById,
    insertTyonantaja,
    modifyTyonantaja,
    deleteTyonantaja,
    getTyonantajaLogin,
};
