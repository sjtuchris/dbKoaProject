const Koa = require('koa')
  , koa = require('koa-router')()
  , json = require('koa-json')
  , logger = require('koa-logger')
  , auth = require('./server/routes/auth.js')
  , api = require('./server/routes/api.js')
  , jwt = require('koa-jwt');	// 引入各种依赖

const app = new Koa();

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async (ctx, next)=>{
  let start = new Date;
  await next();
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms); // 显示执行的时间
});

app.use(async (ctx, next)=>{  //  如果JWT验证失败，返回验证失败信息
  try {
    await next();
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

koa.use('/auth', auth.routes());
//koa.use("/api",jwt({secret: 'vue-koa-demo'}),api.routes());

koa.use('/api', api.routes());

app.use(koa.routes());

app.listen(8889,() => {
  console.log('Koa is listening in 8889');
});

module.exports = app;