const database = require('../database/db');

async function insertCooperate(user) {
  const connection = await database.createConnection();
    return new Promise((resolve, reject) => {
      
      const sql = 'INSERT INTO cooperate_table (cooperate_name, cooperate_email, type_of_profile, password, contact_number) VALUES (?, ?, ?, ?, ?)';
      const values = [user.companyName, user.email, user.typeOfProfile, user.password, user.contactNumber];
      
      connection.query(sql, values, (err, results) => {
        if (err) {
           
          reject(err);
        } else {
          resolve(results);
        }
        database.closeConnection(connection);
      });
    });
   
  }

 async function  loginCooperate (email, password) {
  const connection = await database.createConnection();
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
        database.closeConnection(connection);
      });
    });
  }
  
  async function SelectCooperates() {
    const connection = await database.createConnection();
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM cooperate_table';
      connection.query(sql, (err, results) => {
        if (err) {
           
          reject(err);
        } else {
          resolve(results);
        }
        database.closeConnection(connection);
      });
    });
  }
  
  


  async function insertUser(user) {
    const connection = await database.createConnection();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users_table (username, user_email, password) VALUES (?, ?, ?)';
      const values = [user.name, user.email, user.password];
      
      connection.query(sql, values, (err, results) => {
        if (err) {
         
          reject(err);
        } else {
          resolve(results);
        }
        database.closeConnection(connection);
      });
    });
  }

  async function loginUser(email, password) {
    const connection = await database.createConnection();
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
        database.closeConnection(connection);
      });
    });
  }

  async function insertProducts(name, price, description, cooperate_id) {
    const connection = await database.createConnection();
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO ecommerce_website (product_name,product_price, product_text, cooperate_id) VALUES (?, ?, ?, ?)';
      const values = [name, price, description,cooperate_id];
      
      connection.query(sql, values, (err, results) => {
        if (err) {
           
          reject(err);
        } else {
          resolve(results);
        }
        database.closeConnection(connection);
      });
    });
  }
  
 async  function SelectProducts() {
    const connection = await database.createConnection();
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ecommerce_website';
      connection.query(sql, (err, results) => {
        if (err) {
          
          reject(err);
        } else {
          resolve(results);
        }
        database.closeConnection(connection);
      });
    });
  }

  async function selectCooperateById(cooperate_id) {
    const connection = await database.createConnection();
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM cooperate_table WHERE cooperate_id = ?';
      const values = [cooperate_id];
  
      connection.query(sql, values, (err, results) => {
        if (err) {
       
          reject(err);
        } else {
          resolve(results);
        }
        database.closeConnection(connection);
      });
    });
  }

  module.exports = {
    insertCooperate,
    insertUser,
    loginCooperate,
    loginUser,
    SelectCooperates,
    insertProducts,
    SelectProducts,
    selectCooperateById,
  }
  