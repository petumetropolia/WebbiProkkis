'use strict';
const pool = require("../Db");
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const sql =`SELECT * FROM Työntekijä ` ;
        const [rows] = await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const getUserById = async (id) => {
    try {
        const sql =` SELECT Työntekijä. * from Työntekijä where tyontekija_id=?`;
        const [rows] = await promisePool.query(sql,[id]);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql query failed');
    }
};

const insertUser = async (user) => {
    try {
        const sql =` INSERT INTO Työntekijä VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const [rows] = await promisePool.query(sql,[
            null,
            user.name,
            user.surname,
            user.email,
            user.profession,
            user.description,
            user.filename,
            user.password,
        ]);
       /* const sql2 =` INSERT INTO Media VALUES (?, ?, ?, ?)`;
        const [rows2] = await promisePool.query(sql2,[
            null,
            user.filename,
            user.id,
            null

        ]); */
        return rows;
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql insert user failed');
    }
};

const modifyUser = async (userId,user) => {
    try {
        const sql =`UPDATE Työntekijä SET filename=?, etunimi=?, sukunimi=?, sähköposti=?, ammatti=?, kuvaus=?, salasana=?
        where tyontekija_id=?`;
        console.log(user);

        const [rows] = await promisePool.query(sql,[
            user.filename,
            user.name,
            user.surname,
            user.email,
            user.profession,
            user.description,
            user.password,
            userId
        ]);

        return rows
    } catch (e) {
        console.error("error", e.message);
        throw new Error('sql update user failed');
    }
};

const deleteUser = async (id) => {
    try {
        const sql =`DELETE FROM Työntekijä where tyontekija_id=?`;
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
            'SELECT * FROM Työntekijä WHERE sähköposti = ?;',
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
