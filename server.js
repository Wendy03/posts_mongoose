const http = require('http');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const port = process.env.PORT;

const requestListener = (req, res) => {
  console.log(req.url);
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/posts`);
});
