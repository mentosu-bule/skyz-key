const express = require('express');
const app = express();
const port = 3000;

let currentHolder = null;

app.use(express.json());

// 状態を取得
app.get('/key-status', (req, res) => {
    res.json({ currentHolder: currentHolder });
});

// 状態を更新
app.post('/update-key-status', (req, res) => {
    currentHolder = req.body.currentHolder;
    res.status(200).send("状態が更新されました");
});

app.listen(port, () => {
    console.log(`サーバーは http://localhost:${port} で動作しています`);
});
