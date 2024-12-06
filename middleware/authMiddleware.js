const jwt = require('jsonwebtoken');

// Middleware для проверки токена
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Токен не предоставлен' });

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.status(403).json({ message: 'Неавторизованный доступ' });
        req.user = user;
        next();
    });
}

// Применяем middleware к маршрутам, которые требуют авторизации
router.use('/projects', authenticateToken);
