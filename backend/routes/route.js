const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/api/register', async (req, res) => {
    try {
      const user = req.body; 

      const result = await controller.insertCooperate(user);
      res.json({ message: 'Registration successful', result });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error });
    }
  });

  router.post('/api/registerUser', async (req, res) => {
    try {
      const user = req.body;
   
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
      console.log(user);
      res.json({success:'Login successful', user });
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

  router.get('/api/cooperateData', async(req, res) => {
    try {
        const cooperates = await controller.SelectCooperates();
        res.json({success: true, cooperates});
    } catch (error) {
        console.error('Login failed:', error);
      res.status(401).json({ message: error });
    }
  });

  router.post('/api/insertProducts', upload.single('image'), async(req, res) => {
    const formData = req.body;
    const file = req.file;
    console.log(file);
  

    const name = formData.name;
    const price = formData.price;
    const description = formData.description || '';
    const cooperate_id = formData.cooperate_id;
    const image = file.buffer;

    console.log(name, price, description, cooperate_id);

    try {
       
        const cooperates = await controller.insertProducts(name, price, description, cooperate_id, image);
        res.json({success: true, cooperates});
    } catch (error) {
        console.error('Login failed:', error);
        res.status(401).json({ message: error });
    }
  });

  router.get('/api/selectProducts', async(req, res) => {
    try {
        const cooperates = await controller.SelectProducts();
        res.json({success: true, cooperates});
    } catch (error) {
        console.error('Login failed:', error);
      res.status(401).json({ message: error });
    }
  });

  router.get('/api/selectCooperateById/:cooperate_id', async(req, res) => {
    try {
        const {cooperate_id} = req.params;
        const data = await controller.selectCooperateById(cooperate_id);
        res.json({success: true, data});
    } catch (error) {
        console.error('Login failed:', error);
        res.status(401).json({ message: error });
    }
  });

  module.exports = router;