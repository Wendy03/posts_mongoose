const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
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

const requestListener = (req, res) => {
  console.log(req.url);
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/posts`);
});
