const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blocklist = require('../middleware/tokenBlocklist');

// "baza danych" w pamięci — zastąp MongoDB/PostgreSQL docelowo
const users = [];

// REGISTER
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Podaj login i hasło' });
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(409).json({ message: 'Użytkownik już istnieje' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'Zarejestrowano pomyślnie' });
};

// LOGIN
exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Błędne dane' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Błędne dane' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
};

// LOGOUT — unieważnienie tokenu
exports.logout = (req, res) => {
    blocklist.add(req.token);
    res.json({ message: 'Wylogowano pomyślnie' });
};

// PROFILE — endpoint chroniony
exports.profile = (req, res) => {
    res.json({ message: 'Twój profil', user: req.user });
};
