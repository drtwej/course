const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');  // Модель проекта

// Регистрация нового пользователя
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
});

// Вход пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка входа' });
    }
});

// Получение всех проектов пользователя
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id });
        res.json({ projects });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения проектов' });
    }
});

// Создание нового проекта
router.post('/projects', async (req, res) => {
    const { title, description, startDate, endDate } = req.body;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Нет авторизации' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const newProject = new Project({
            title,
            description,
            startDate,
            endDate,
            createdBy: decoded.userId,
        });

        await newProject.save();
        res.status(201).json({ message: 'Проект успешно добавлен' });
    } catch (err) {
        logger.error('Ошибка при добавлении проекта', { error: err });
        res.status(500).json({ message: 'Произошла ошибка при добавлении проекта' });
    }
});


module.exports = router;
