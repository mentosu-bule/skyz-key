let currentHolder = null; // 現在の鍵の所有者

const currentStatus = document.getElementById("current-status");
const nameInput = document.getElementById("name-input");
const borrowButton = document.getElementById("borrow-button");
const returnButton = document.getElementById("return-button");
const transferButton = document.getElementById("transfer-button");

// ページロード時にサーバーから状態を取得
window.addEventListener("load", async () => {
    await fetchKeyStatus(); // サーバーから状態を取得
    updateStatus(); // 状態を更新
});

// 鍵を借りる処理
borrowButton.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    if (!name) {
        alert("名前を入力してください。");
        return;
    }
    if (currentHolder) {
        alert("鍵は既に借りられています。");
        return;
    }
    currentHolder = name;
    await updateKeyStatus(); // サーバーに状態を送信
    updateStatus();
});

// 鍵を返却する処理
returnButton.addEventListener("click", async () => {
    if (!currentHolder) {
        alert("鍵は誰も借りていません。");
        return;
    }
    const name = nameInput.value.trim();
    if (name !== currentHolder) {
        alert("現在の借主の名前を入力してください。");
        return;
    }
    currentHolder = null;
    await updateKeyStatus(); // サーバーに状態を送信
    updateStatus();
});

// 鍵を引き継ぐ処理
transferButton.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    if (!name) {
        alert("新しい借主の名前を入力してください。");
        return;
    }
    if (!currentHolder) {
        alert("鍵は誰も借りていません。");
        return;
    }
    currentHolder = name;
    await updateKeyStatus(); // サーバーに状態を送信
    updateStatus();
});

// 状態を更新する関数
function updateStatus() {
    if (currentHolder) {
        currentStatus.textContent = `鍵は現在「${currentHolder}」さんが借りています。`;
    } else {
        currentStatus.textContent = "鍵は誰も借りていません。";
    }
    nameInput.value = ""; // 入力欄をクリア
}

// サーバーから状態を取得する関数
async function fetchKeyStatus() {
    try {
        const response = await fetch('/key-status'); // サーバーから状態を取得
        if (response.ok) {
            const data = await response.json();
            currentHolder = data.currentHolder;
        }
    } catch (error) {
        console.error("状態の取得に失敗しました", error);
    }
}

// サーバーに状態を送信して更新する関数
async function updateKeyStatus() {
    try {
        const response = await fetch('/update-key-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentHolder: currentHolder })
        });
        if (!response.ok) {
            throw new Error("状態の更新に失敗しました");
        }
    } catch (error) {
        console.error("状態の更新に失敗しました", error);
    }
}
