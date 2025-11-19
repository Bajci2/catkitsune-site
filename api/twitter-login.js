export default function handler(req, res) {
  const CLIENT_ID = process.env.TWITTER_CLIENT_ID;
  const REDIRECT_URI = "https://catkitsune.xyz/api/twitter-callback";

  const url =
    "https://twitter.com/i/oauth2/authorize?" +
    "response_type=code" +
    "&client_id=" + CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&scope=users.read%20tweet.read%20tweet.write%20offline.access" +
    "&state=login" +
    "&code_challenge=challenge" +
    "&code_challenge_method=plain";

  return res.redirect(url);
}
