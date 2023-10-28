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

  function loginCooperate(email, password) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM cooperate_table WHERE cooperate_email = ?';
      const values = [email];
  
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err); 
        } else {
          if (results.length > 0) {
            const user = results[0];
            if (user.password === password) {
              resolve(user); 
            } else {
              reject('Invalid password'); 
            }
          } else {
            reject('User not found'); 
          }
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

  function loginUser(email, password) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users_table WHERE user_email = ?';
      const values = [email];
  
      connection.query(sql, values, (err, results) => {
        if (err) {
          reject(err); 
        } else {
          if (results.length > 0) {
            const user = results[0];
            if (user.password === password) {
              resolve(user); 
            } else {
              reject('Invalid password'); 
            }
          } else {
            reject('User not found'); 
          }
        }
      });
    });
  }
  

  module.exports = {
    insertCooperate,
    insertUser,
    loginCooperate,
    loginUser,
  }
  