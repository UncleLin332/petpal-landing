# PetPal 官方 Landing Page (Version 1)

> **Slogan**：讓好習慣發生在現實世界，而不是手機裡。  
> **團隊**：國立臺灣科技大學 × 國立臺灣大學 · 河童團 (Kappa Team)  
> **專案定位**：桌上型習慣養成實體電子寵物裝置與配套 iOS App 

本目錄為 PetPal 專案的獨立、自包含（Self-contained）第一版官方 Landing Page，整合了團隊現有的高解析度渲染素材、3D 模型、實機雙向閉環通訊成果與早鳥名單收集系統。

---

## 📂 目錄架構

```
landing_page/
├── index.html                   # 核心單頁應用（語意化 HTML5 + Tailwind CSS 現代極簡排版）
├── assets/
│   ├── css/
│   │   └── style.css            # 自訂字體、毛玻璃特效、呼吸發光與觸覺微震動畫
│   ├── js/
│   │   └── main.js              # 3D/實景切換、實機閉環互動模擬器、早鳥表單與 Confetti 慶祝特效
│   ├── models/
│   │   └── petpal-device.glb    # PetPal 3D 實體模型（供 Google Model Viewer 互動旋轉檢視）
│   └── images/                  # 高解析度宣傳圖與情境實照
│       ├── hero-main.jpg        # 主視覺桌面情境特寫（裝置 + 手機 App）
│       ├── device-ref.jpg       # 白色實體裝置設計基準圖（開模比例）
│       ├── feature-drawer.jpg   # 情境 01：手機收進抽屜也能打卡
│       ├── feature-pomodoro.jpg # 情境 02：硬體端 25 分鐘番茄鐘專注進度環
│       ├── feature-ios-sync.jpg # 情境 04：iOS App 自動同步與 HealthKit
│       ├── feature-pets.jpg     # 情境 05：九大風格寵物夥伴
│       ├── feature-evolution.jpg# 情境 05：靈魂演化與隱藏角色圖譜
│       └── feature-streetpass.jpg# 情境 06：BLE 近場擦身互動與雙人羈絆
└── README.md                    # 本說明文件
```

---

## 🚀 本地快速預覽 (Local Preview)

只要在終端機執行輕量 Python HTTP Server，即可在瀏覽器完整預覽（包含 3D 模型與所有互動）：

```bash
# 在專案根目錄或 landing_page 目錄下執行：
cd "landing_page"
python3 -m http.server 8080
```

接著在瀏覽器打開：  
👉 **`http://localhost:8080`**

---

## ✨ 核心亮點功能說明

1. **Hero 實景寫真與動態標註**：
   - 採用高解析度實體桌面特寫照，搭配微動態呼吸脈衝點（Hotspots），零載入等待，直觀呈現圓形螢幕、觸控打卡與 iOS 連動。
2. **🎮 9/4 軟硬體雙向閉環互動模擬器 (Live Interactive Sandbox)**：
   - 線上即時模擬團隊於 2026/09/04 攻克的實機通訊協議：
   - 點擊【🚶 走動 5 步】：裝置輕震 (`haptic.TICK`)，手機端 47 分鐘久坐警報瞬間撤除並彈出「Mochi felt you walking!」綠色膠囊！
   - 點擊【🏃 走滿 15 步】：裝置雙震 (`haptic.CONFIRM`)，手機端 Habits 的「Take a Walk」自動打勾、Streak +1！
   - 點擊【🖐️ 摸一下打卡】：Mochi 眨眼微笑反饋！
3. **早鳥名單收集與 VIP 授證**：
   - 輸入 Email 送出後自動觸發五彩紙屑慶祝（Canvas Confetti），頒發專屬早鳥序號卡（如：`VIP-PETPAL-0042`），並自動存入瀏覽器 `localStorage`。
   - **後台匯出名單捷徑**：在瀏覽器 F12 Console 輸入 `exportWaitlistCSV()` 即可一鍵下載收集到的名單 CSV。

---

## 🌐 線上部署指南 (1 分鐘免費上線)

因為本目錄是 100% 純靜態（Zero Dependencies），可直接發布：

### 方案 A：GitHub Pages
1. 將專案推送到 GitHub。
2. 進入 Repo 的 `Settings` -> `Pages`。
3. Source 選擇 `Deploy from a branch`，路徑指定 `/landing_page`（或將內容置於 `docs/` 或根目錄）。

### 方案 B：Vercel / Cloudflare Pages / Netlify
1. 直接在 Vercel 連結該 GitHub 倉庫。
2. Root Directory 設定為 `landing_page`。
3. 點擊 `Deploy`，即可獲得免費的 HTTPS 官方網站網址！
