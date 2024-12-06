// models/Task.js (модель задачи)

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Новая', 'В процессе', 'Завершена'],
    default: 'Новая',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', TaskSchema);
