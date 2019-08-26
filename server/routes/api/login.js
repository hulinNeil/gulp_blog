module.exports = (ctx) => {
  const query = ctx.request.body;
  const body = {
    success: false,
    ctx: query
  };
  if (query.name && query.password && query.name === 'hulin' && query.password === '123456') {
    body.success = true;
    ctx.cookies.set('username', 'hulin', {
      path: '/',
      maxAge: 1000 * 60 * 60 * 30,
      expires: new Date(),
      httpOnly: false,
      overwrite: false
    });
  };
  ctx.body = body;
}
