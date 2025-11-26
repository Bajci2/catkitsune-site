// Vercel Serverless Function
// File: /api/get-tweets.js
// MANUAL TWEET CONFIGURATION

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  
  // ============================================
  // 📝 FRISSÍTSD EZEKET AMIKOR ÚJ TWEET JÖN!
  // ============================================
  
  const manualTweets = [
    {
      id: '1993738768474337429',
      text: '🚀 CatKitSune is evolving step by step — the site is growing and new features are rolling out. Still early, but the progress is getting real 👀 ✨ CatKitSune NFTs will also arrive on DripTrade soon — stay tuned 🫧 Everything is being built piece by piece.',
      url: 'https://x.com/GborSzakl1/status/1993738768474337429',
      created_at: '2024-11-26T18:00:00Z'
    },
    {
      id: '1993693470049911221',
      text: '💎 Join the CatKitSune community and be part of the journey!',
      url: 'https://x.com/GborSzakl1/status/1993693470049911221',
      created_at: '2024-11-26T15:00:00Z'
    }
  ];
  
  return res.status(200).json({
    success: true,
    username: 'GborSzakl1',
    tweets: manualTweets,
    fetched_at: new Date().toISOString()
  });
}
```

---

## 📋 MIT CSINÁLJ:

### **1. Menj:**
```
https://github.com/Bajci2/catkitsune-site/blob/main/api/get-tweets.js
```

### **2. Edit (ceruza)**

### **3. CTRL+A → DELETE** (töröld az egészet)

### **4. Másold be a FENTI kódot** ↑

### **5. Commit changes**

### **6. Várj 2 perc**

### **7. Teszteld:**
```
https://catkitsune-site.vercel.app/api/get-tweets
