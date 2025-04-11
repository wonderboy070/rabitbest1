const express = require('express');
const app = express();
const port = 3000;

// Asosiy sahifa
app.get('/', (req, res) => {
  res.send('Salom, MedFit AI Serverga xush kelibsiz!');
});

// Serverni ishga tushurish
app.listen(port, () => {
  console.log(`Server http://localhost:${port} da ishlamoqda`);
});
