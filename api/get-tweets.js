// Vercel Serverless Function
// File: /api/get-tweets.js

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Twitter Bearer Token
  const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN || 'AAAAAAAAAAAAAAAAAAAAABPG4AEAAAAAz3ylzxSVQp%2F6Dl4CmPKQbVjF5Q8%3D8SnZFemHe68q4IK05wNcFym6KdNLch7ZbKMSrHSs3iiUnmLolk';
  
  if (!BEARER_TOKEN) {
    return res.status(500).json({ 
      error: 'Twitter Bearer Token not configured' 
    });
  }

  try {
    // Step 1: Get user ID by username
    const userResponse = await fetch(
      'https://api.twitter.com/2/users/by/username/GborSzakl1',
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!userResponse.ok) {
      const error = await userResponse.json();
      console.error('Twitter API Error (user lookup):', error);
      return res.status(userResponse.status).json({ 
        error: 'Failed to fetch user data',
        details: error 
      });
    }

    const userData = await userResponse.json();
    const userId = userData.data.id;

    // Step 2: Get latest 2 tweets from user
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=2&tweet.fields=created_at,text,id`,
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!tweetsResponse.ok) {
      const error = await tweetsResponse.json();
      console.error('Twitter API Error (tweets):', error);
      return res.status(tweetsResponse.status).json({ 
        error: 'Failed to fetch tweets',
        details: error 
      });
    }

    const tweetsData = await tweetsResponse.json();

    // Format response
    const tweets = tweetsData.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      url: `https://x.com/GborSzakl1/status/${tweet.id}`
    }));

    return res.status(200).json({
      success: true,
      username: 'GborSzakl1',
      user_id: userId,
      tweets: tweets,
      fetched_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
```

---

## 📋 LÉPÉSEK:

### **1. Menj ide:**
```
https://github.com/Bajci2/catkitsune-site/blob/main/api/get-tweets.js
```

### **2. Kattints: Edit (ceruza ikon)**

### **3. Töröld ki az ÖSSZES régi kódot**

### **4. Másold be a FENTI TELJES kódot**

### **5. Commit changes**

### **6. Várj 2-3 percet** (Vercel deploy)

### **7. Várj még ~10 percet** (Twitter rate limit reset)

### **8. Teszteld:**
```
https://catkitsune-site.vercel.app/api/get-tweets
