const message = require('../models/message.js');

const userAllSentMessage = async function(ctx) {
  const data = ctx.request.body;
  const messages = await message.getUserSentMessage(data);
  console.log(messages);
  ctx.body = messages;
}

const userAllReceivedMessage = async function(ctx) {
  const data = ctx.request.body;
  const messages = await message.getUserReceivedMessage(data);
  console.log(messages);
  ctx.body = messages;
}

const sendMessage = async function(ctx) {
  const data = ctx.request.body;
  try{
    if (data.uid == data.toid) {
      ctx.body = {
        success: false,
        info: 'Could not send message to yourself'
      };
      console.log(data.uid + ': Could not send message to yourself');
      return;
    }
    await message.insertMessage(data);
  } catch(error) {
      ctx.body = {
          success: false,
          info: error.name
      };
      console.log(error.name);
      return;
  }
  ctx.body = {
    success: true,
    info: 'Message: ' + data.mcontent
  };
  console.log('Message: ' + data.mcontent);
}

const deleteMessage = async function(ctx) {
  const data = ctx.request.body;
  try {
    await message.deleteMessage(data);
    console.log('Delete message successfully');
  } catch (error){
    ctx.body = {
      success: false,
      info: error.name
    }
    console.log(error.name);
    return;
  }
  ctx.body = {
    success: true,
    info: 'Delete message successfully'
  }
}

module.exports = (router) => {
  router.post('/message/sentMessages', userAllSentMessage),
  router.post('/message/receivedMessages', userAllReceivedMessage),
  router.post('/message/sendMessage', sendMessage),
  router.post('/message/deleteMessage', deleteMessage)
}