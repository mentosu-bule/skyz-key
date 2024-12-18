const express = require('express');
const app = express();
const port = 3000;

// 鍵の状態（初期値はnull）
let currentHolder = null;

app.use(express.json());

// 状態を取得するエンドポイント
app.get('/key-status', (req, res) => {
    res.json({ currentHolder: currentHolder });
});

// 状態を更新するエンドポイント
app.post('/update-key-status', (req, res) => {
    currentHolder = req.body.currentHolder; // 新しい借り手の名前を保存
    res.status(200).send("状態が更新されました");
});

app.listen(port, () => {
    console.log(`サーバーは http://localhost:${port} で動作しています`);
});
