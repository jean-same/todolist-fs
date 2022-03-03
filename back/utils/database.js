const mysql = require('promise-mysql')
require('dotenv').config()

const pool = mysql.createPool({
    host     : process.env.DB_HOST ,
    user     : process.env.DB_USER  ,
    password : process.env.DB_PASSWORD ,
    database : process.env.DB_DATABASE 
})

module.exports = {
    getConnection() {
      return new Promise(function (res, rej) {
        pool
          .then(function (conn) {
            console.log("Database connected")
            res(conn);
          })
          .catch(function (error) {
            rej(error);
          });
      });
    }
};
  