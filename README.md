# Starlit 星曜

輸入出生資料，同時排出西洋星盤、紫微斗數命盤與人類圖，並產生詳細解析。

- `index.html`：頁面與樣式
- `js/engine.js`：星盤（回歸黃道、Placidus，高緯度改用等宮制）、真月交點、人類圖計算
- `js/reading-zh.js`：三套詳解產生器（中文）
- `js/hd-zh.js`：人類圖中文資料與輪迴交叉表
- `js/i18n.js`：中、英、日、法介面文字
- `js/app.js`：畫面互動

計算來源：
- 星曆：Swiss Ephemeris（[swisseph-wasm](https://github.com/prolaxu/swisseph-wasm)，放在 `vendor/swisseph`，GPL-3.0；商業使用需向 Astrodienst 取得授權）。載入失敗時自動改用 [astronomy-engine](https://github.com/cosinekitty/astronomy)。
- 紫微斗數：[iztro](https://github.com/SylarLong/iztro)。
