require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transanctionRoutes')
const loanRoutes = require('./routes/loanRoutes');

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
