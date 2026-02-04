/**
 * AppStream tracking endpoint – server-side.
 * Receives beacon payload from analytics.js and adds server-seen IP.
 * Deploy with Vercel (or similar) so TRACKING_ENDPOINT points here.
 * For persistence, add writing to a DB or log stream below.
 */

function getClientIp(req) {
  return (
    (req.headers && (req.headers['x-forwarded-for'] || req.headers['x-real-ip'])) ||
    (req.connection && req.connection.remoteAddress) ||
    (req.socket && req.socket.remoteAddress) ||
    ''
  );
}

function getFirstIp(header) {
  if (!header) return '';
  return String(header).split(',')[0].trim();
}

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).setHeader('Allow', 'POST').end();
  }

  var serverIp = getFirstIp(req.headers['x-forwarded-for']) || getClientIp(req);
  var body = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  } catch (e) {}

  var event = {
    ts: new Date().toISOString(),
    serverIp: serverIp,
    path: body.path,
    url: body.url,
    ref: body.ref,
    viewId: body.viewId,
    ua: body.ua,
    lang: body.lang,
    tz: body.tz,
    clientGeo: body.geo || {}
  };

  // Optional: persist event (e.g. to DB or log). Example:
  // await db.events.insert(event);
  console.log(JSON.stringify(event));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.status(204).end();
}
