var log4js = require('log4js');

log4js.loadAppender("dateFile");
log4js.addAppender(log4js.appenderMakers['dateFile']({  
    filename:"/home/u1/logs/webrexco.log",  
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
            addr:'192.168.18.198',
            port:5522
        }
    },
    webrexcoHost:{
        url: "http://www.laixiangke.com/webrexco"
    },
    uploadHost: {
        url: "http://adtp.cnaidai.com:881"
    },
    html:{
        
    }
}