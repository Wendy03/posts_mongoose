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
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        if (data.content !== '') {
          let { name, content, image, createdAt } = data;
          const newPost = await Post.create({
            name,
            content,
            image,
            createdAt,
          });
          successHandler(res, newPost);
        } else {
          errorHandler(res, 400, '資料錯誤');
        }
      } catch (err) {
        errorHandler(res, 400, '資料錯誤');
      }
    });
  } else if (req.url === '/posts' && req.method === 'DELETE') {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  } else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
    const id = req.url.split('/').pop();
    const posts = await Post.findByIdAndDelete(id);
    successHandler(res, posts);
  } else if (req.url.startsWith('/posts/') && req.method === 'PATCH') {
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const id = req.url.split('/').pop();
        if (data.content !== '') {
          let { content, image, likes } = data;
          const posts = await Post.findByIdAndUpdate(id, {
            $set: {
              content,
              image,
              likes,
            },
          });
          successHandler(res, posts);
        } else {
          errorHandler(res, 400, 'content必填');
        }
      } catch (err) {
        errorHandler(res, 400, '資料錯誤');
      }
    });
  } else if (req.url === '/posts' && req.method === 'OPTIONS') {
    successHandler(res, 'OPTIONS');
  } else {
    errorHandler(res, 404, '無此網頁');
  }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/posts`);
});
