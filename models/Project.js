const mongoose = require('mongoose');

// Схема для проекта
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Ссылка на пользователя
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
