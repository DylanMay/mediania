function errorHandler(err, req, res, next) {
    // 记录错误信息到日志
    console.error(err.stack);
  
    // TODO: 检查错误类型， 如果是自定义错误类型，可以根据错误类型发送适当的响应
    // 对于其他未处理的错误，默认发送 500 Internal Server Error 响应
    res.json({code: 4, message: 'Internal Server Error' });
  }
  
  module.exports = errorHandler;
  