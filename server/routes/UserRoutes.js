const express = require('express');
const controllers = require('./../controllers/controllers');
const taskControllers=require('./../controllers/taskControllers')

const router = express.Router();

router.route('/Signup').post(controllers.signup);
router.route('/Login').post(controllers.login);
router.route('/Addtask').post(taskControllers.addTask);
router.route('/Gettask').get(taskControllers.getTask);
router.route('/Deletetask/:id').delete(taskControllers.deleteTask);
router.route('/Getonetask/:id').get(taskControllers.getoneTask);
router.route('/Updatetask/:id').put(taskControllers.updateTask)
module.exports = router;
