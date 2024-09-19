require('dotenv').config();

const app = require('./app/app');
const PORT = process.env.PORT || 3000;

app.listen( PORT, () => console.log(`Server connected: 127.0.0.1:${PORT}`))