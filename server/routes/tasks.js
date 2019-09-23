import express from 'express';
const router = express.Router();
import Task from '../models/task.model.js';

router.route('/').get((req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(error => res.status(400).json('Error: ' + error))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = Date.parse(req.body.date);
    
    const newTask = new Task({
        username,
        description,
        duration,
        date
    });

    newTask.save()
    .then(() => res.json('Task Added'))
    .catch(error => res.status(400).json('Error: ' + error));

});

router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
    .then(task => {
        task.username = req.body.username;
        task.description = req.body.description;
        task.duration = req.body.duration;
        task.date = Date.parse(req.body.date);

        task.save()
        .then(() => res.json('Exercise Updated'))
        .catch(error => res.status(400).json('Error: ' + error))
    })
    .catch(error => res.status(400).json('Error: ' + error ))
});


module.exports = router;