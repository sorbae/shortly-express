const parseCookies = (req, res, next) => {
  let cookies = req.headers.cookie;
  req.cookies = {};

  if (cookies) {
    let cookiesArr = cookies.split('; ')
    .forEach(function(cookie) {
      let cookieValues = cookie.split('=');
      req.cookies[cookieValues[0]] = cookieValues[1];
    })
  }
  next()
};

module.exports = parseCookies;

// req.cookies = {}

// if cookies does not exist
//   return req.cookies
// if it does exist --> cookies.split('; ')
//   iterate through cookies
//     x = cookie.split('=')
//     req.cookies[x[0]] = x[1];
