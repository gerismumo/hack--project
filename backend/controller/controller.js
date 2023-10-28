const connection = require('../database/db');

function insertCooperate(user) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO cooperate_table (cooperate_name, cooperate_email, type_of_profile, password, contact_number) VALUES (?, ?, ?, ?, ?)';
      const values = [user.companyName, user.email, user.typeOfProfile, user.password, user.contactNumber];
      
      connection.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  function insertUser(user) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users_table (username, user_email, password) VALUES (?, ?, ?)';
      const values = [user.name, user.email, user.password];
      
      connection.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  module.exports = {
    insertCooperate,
    insertUser,
  }
  