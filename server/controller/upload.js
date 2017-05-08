const upload = require('../models/upload.js');
const path = require('path')

const uploadFileGet = async function(ctx) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="./postUpload" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
 } 

const uploadFilePost = async function(ctx) {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join( __dirname, '../../static' )

    // 上传文件事件
    result = await upload.uploadFile( ctx, {
      fileType: 'album', // common or album
      path: serverFilePath
    });

    ctx.body = result
}

module.exports = (router) => {
  router.get('/upload/getUpload', uploadFileGet);
  router.post('/upload/postUpload', uploadFilePost);
}