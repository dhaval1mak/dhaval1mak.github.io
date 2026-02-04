/**
 * AppStream – page view tracking with IP and location.
 * Sends: page URL, referrer, timestamp, view ID; client-side IP/geo from ipapi.co; server adds request IP when you use api/track.
 */
(function () {
  var config = window.APPSTREAM_CONFIG;
  if (!config || !config.TRACKING_ENDPOINT) return;

  var base = (typeof config.SITE_URL === 'string' && config.SITE_URL) ? config.SITE_URL : '';
  var payload = {
    ts: new Date().toISOString(),
    path: window.location.pathname || '/',
    url: window.location.href,
    ref: document.referrer || '',
    viewId: getViewId(),
    ua: navigator.userAgent,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  };

  function getViewId() {
    try {
      var key = 'appstream_vid';
      var id = sessionStorage.getItem(key);
      if (!id) {
        id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem(key, id);
      }
      return id;
    } catch (e) { return ''; }
  }

  function send(data) {
    var endpoint = config.TRACKING_ENDPOINT;
    if (endpoint.startsWith('/')) endpoint = (base.replace(/\/$/, '') || window.location.origin) + endpoint;
    try {
      navigator.sendBeacon(endpoint, JSON.stringify(data));
    } catch (e) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
    }
  }

  function withGeo(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipapi.co/json/', true);
    xhr.onload = function () {
      try {
        var j = JSON.parse(xhr.responseText);
        cb({
          ip: j.ip || '',
          city: j.city || '',
          region: j.region || '',
          country: j.country_name || j.country_code || '',
          countryCode: j.country_code || ''
        });
      } catch (e) { cb({}); }
    };
    xhr.onerror = function () { cb({}); };
    xhr.send();
  }

  withGeo(function (geo) {
    payload.geo = geo;
    send(payload);
  });
})();
