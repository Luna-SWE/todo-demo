const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = newTask({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: 'ok', data: newTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select('-__v');
    res.status(200).json({ status: 'ok', data: taskList });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.param.id);
    if (!task) {
      throw new Error('Threr is no task.');
    }
    const fields = Object.keys(req.body);
    fields.map((item) => (task[item] = req.body[item]));
    await task.save();
    res.status(200).json({ status: 'ok', data: task });
  } catch (err) {
    res.status(400).json({ status: 'fail', err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const deletItem = await Task.findById(req.param.id);
    res.status(200).json({ status: 'ok', data: deletItem });
  } catch (err) {
    res.status(400).json({ status: 'fail', err });
  }
};

module.exports = taskController;
