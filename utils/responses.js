const headers = require('./headers');

const successHandler = (res, data) => {
  res.writeHead('200', headers);
  res.write(
    JSON.stringify({
      status: 'success',
      data,
    })
  );
  res.end();
};

const errorHandler = (res, status, message) => {
  res.writeHead(status, headers);
  res.write(
    JSON.stringify({
      status: 'false',
      message: message,
    })
  );
  res.end();
};

module.exports = {
  successHandler,
  errorHandler,
};
