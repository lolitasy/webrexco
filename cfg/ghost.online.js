var log4js = require('log4js');

log4js.loadAppender("dateFile");
log4js.addAppender(log4js.appenderMakers['dateFile']({  
    filename:"/home/u1/logs/webrexco/webrexco.log",  
    pattern: '.yyyy-MM-dd',alwaysIncludePattern: true,
    layout: {
        type: 'pattern',
        pattern: '[%d %p %c] %m%n'
    }  
}), 'webrexco');

module.exports = {
    getLogger:function() {
        return log4js.getLogger('webrexco');
    },
    dscm:{
        makercenter:{
            addr:'192.168.100.47',
            port:5511
        }
    },
    webrexcoHost:{
        url: "http://www.laixiangke.com/webrexco"
    },
    uploadHost: {
        url: "https://adtp.cnaidai.com"
    },
    html:{
        
    }
}