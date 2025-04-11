const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const uuid = require('uuid');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Telegram bot token va chat ID
const botToken = '8018652189:AAFVylfngRUx2QAzSgXZbCEVtJq-xZ8Is6c';
const chatId = '6347338395';  // Telegram foydalanuvchisining chat ID sini kiriting

// Tasdiqlash kodi
let verificationCode = null; 

// Foydalanuvchi login so'rovi
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Email va parolni tekshirish (bu yerda oddiy tekshiruv, haqiqiy tizimda DB ishlatish kerak)
    if (email === 'botirovjamshid526@gmail.com' && password === '1A@11111') {
        // Tasdiqlash kodini yaratish
        verificationCode = uuid.v4().slice(0, 6); // UUID'dan tasdiqlash kodi olish
        console.log(`Tasdiqlash kodi: ${verificationCode}`); // Logda tasdiqlash kodini ko'rish mumkin

        // Telegram orqali tasdiqlash kodini yuborish
        const message = `Sizning tasdiqlash kodingiz: ${verificationCode}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Telegramga yuborishda xato.' });
            }
        })
        .catch(error => {
            console.error('Telegram yuborishda xato:', error);
            res.json({ success: false, message: 'Telegramga yuborishda xato.' });
        });
    } else {
        res.json({ success: false, message: 'Xato email yoki parol.' });
    }
});

// Tasdiqlash kodi tekshirish
app.post('/api/verify', (req, res) => {
    const { code } = req.body;

    if (code === verificationCode) {
        res.json({ success: true, message: 'Tizimga muvaffaqiyatli kirish!' });
    } else {
        res.json({ success: false, message: 'Noto\'g\'ri tasdiqlash kodi.' });
    }
});

// Serverni ishga tushurish
app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} da ishlayapti.`);
});
