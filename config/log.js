const path = require('path');
const log4js = require('log4js');


log4js.configure({
  appenders: {
    req: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: './logs/req/req.log'
    },
    err: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: './logs/errors/err.log'
    },
    oth: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['oth'], level: 'info' },
    req: { appenders: ['req'], level: 'info' },
    err: { appenders: ['err'], level: 'error'}
  }
})

exports.getLogger = type => {
  return log4js.getLogger(type || 'default');
}
