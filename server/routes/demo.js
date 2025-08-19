const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');

// Demo routes - same structure as user routes but using demo controller
router.get('/', demoController.view);
router.post('/', demoController.find);
router.get('/adduser', demoController.form);
router.post('/adduser', demoController.create);
router.get('/edituser/:id', demoController.edit);
router.post('/edituser/:id', demoController.update);
router.get('/:id', demoController.delete);
router.get('/viewuser/:id', demoController.viewall);

module.exports = router;