const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Guard — serwer nie wystartuje bez JWT_SECRET
if (!process.env.JWT_SECRET) {
    console.error('BŁĄD: Brak JWT_SECRET w zmiennych środowiskowych!');
    process.exit(1);
}

const app = express();

// Middleware globalne
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
