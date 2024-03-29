const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();


const config = {
    host: process.env.HOST,
    database : process.env.DATABASE,
    password: process.env.PASSWORD,
    user: process.env.USER,
    // port: process.env.DB_PORT
    port: 3306,
}

const createConnection = async () => {
    const connection =   mysql.createConnection(config);;
    try {
        await new Promise((resolve, reject) => {
            connection.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            });
        });
        console.log('connection created');
        return connection;

    } catch (err) {
        console.error(err)
    }
}

const closeConnection = (connection) => {
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
      } else {
        console.log('Connection closed');
      }
    });
  };

module.exports = {createConnection, closeConnection};