const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
})

const createTask = asyncWrapper( async (req, res) => {
    const tasks = await Task.create(req.body);
    return res.status(201).json({ tasks });
})

const getTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const tasks = await Task.findOne({_id: taskID});
    if(!tasks) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    } 
    res.status(200).json({ tasks })
})

const updateTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const tasks = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!tasks) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    } 
    res.status(200).json({tasks});
})

const deleteTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params;
    const tasks = await Task.findOneAndRemove({_id: taskID});
    if(!tasks) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404))
    }
    res.status(200).json({ tasks });
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}