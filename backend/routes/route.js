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

  module.exports = router;