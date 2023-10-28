const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/api/register', async (req, res) => {
    try {
      const user = req.body; 
    //   console.log(user);
      const result = await controller.insertCooperate(user);
      res.json({ message: 'Registration successful', result });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error });
    }
  });

  router.post('/api/registerUser', async (req, res) => {
    try {
      const user = req.body;
    //   console.log(user);
      const result = await controller.insertUser(user);
      res.json({ message: 'Registration successful', result });
    } catch (error) {
      console.error('Registration failed:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  router.post('/api/loginCooperate', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await controller.loginCooperate(email, password);
      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(401).json({ message: error });
    }
  });

  router.post('/api/loginUser', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await controller.loginUser(email, password);
      res.json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(401).json({ message: error });
    }
  });

  module.exports = router;