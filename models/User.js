const mongoose = require('mongoose');
const validator = require('validator');  // Подключаем библиотеку для валидации email

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: [validator.isEmail, 'Введите корректный email'], // Валидация email
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: false // Поле name не обязательно
  },
  dateJoined: { 
    type: Date, 
    default: Date.now // Дата регистрации
  }
});

// Создание индекса для ускоренного поиска по email
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
