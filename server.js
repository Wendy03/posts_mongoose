const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { successHandler, errorHandler } = require('./utils/responses');
const Post = require('./model/posts');
dotenv.config({ path: './.env' });

const port = process.env.PORT;
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('Connect DB'))
  .catch((err) => console.log(err));

const requestListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  if (req.url === '/posts' && req.method === 'GET') {
    const posts = await Post.find();
    successHandler(res, posts);
  } else {
    errorHandler(res, 404, '無此網頁');
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/posts`);
});
