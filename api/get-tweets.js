// Vercel Serverless Function
// File: /api/get-tweets.js
// Nitter RSS Feed Parser - NO API KEY NEEDED!

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');
  
  try {
    console.log('🔄 Fetching tweets from Nitter RSS...');
    
    // Nitter RSS URLs (trying multiple instances for reliability)
    const nitterInstances = [
      'https://nitter.net/GborSzakl1/rss',
      'https://nitter.privacydev.net/GborSzakl1/rss',
      'https://nitter.poast.org/GborSzakl1/rss'
    ];
    
    let rssData = null;
    let workingInstance = null;
    
    // Try each Nitter instance until one works
    for (const rssUrl of nitterInstances) {
      try {
        console.log(`Trying: ${rssUrl}`);
        const response = await fetch(rssUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          rssData = await response.text();
          workingInstance = rssUrl;
          console.log(`✅ Success with: ${rssUrl}`);
          break;
        }
      } catch (e) {
        console.log(`❌ Failed: ${rssUrl}`);
        continue;
      }
    }
    
    if (!rssData) {
      return res.status(503).json({
        error: 'All Nitter instances failed',
        message: 'Please try again later'
      });
    }
    
    // Parse RSS XML
    const tweets = parseRSS(rssData);
    
    if (tweets.length === 0) {
      return res.status(404).json({
        error: 'No tweets found',
        message: 'Account may be empty or private'
      });
    }
    
    // Return latest 2 tweets
    const latestTweets = tweets.slice(0, 2).map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.date,
      url: tweet.url
    }));
    
    return res.status(200).json({
      success: true,
      username: 'GborSzakl1',
      tweets: latestTweets,
      fetched_at: new Date().toISOString(),
      source: workingInstance
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}

// Parse RSS XML to extract tweets
function parseRSS(xmlData) {
  const tweets = [];
  
  try {
    // Extract all <item> blocks
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items = xmlData.match(itemRegex) || [];
    
    for (const item of items) {
      // Extract title (tweet text)
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const title = titleMatch ? titleMatch[1] : '';
      
      // Extract link (tweet URL)
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';
      
      // Extract pubDate
      const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const date = dateMatch ? dateMatch[1] : '';
      
      // Extract tweet ID from URL
      const idMatch = link.match(/status\/(\d+)/);
      const id = idMatch ? idMatch[1] : Date.now().toString();
      
      // Clean up tweet text (remove "R to @username: " prefix if exists)
      let cleanText = title.replace(/^R to @[\w]+:\s*/, '');
      
      // Remove RT prefix if exists
      cleanText = cleanText.replace(/^RT by @[\w]+:\s*/, '');
      
      if (cleanText && link) {
        tweets.push({
          id: id,
          text: cleanText,
          url: link,
          date: date
        });
      }
    }
    
    console.log(`✅ Parsed ${tweets.length} tweets`);
    return tweets;
    
  } catch (error) {
    console.error('❌ RSS parse error:', error);
    return [];
  }
}
