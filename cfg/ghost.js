var log4js = require('log4js');

log4js.loadAppender("dateFile");
log4js.addAppender(log4js.appenderMakers['dateFile']({  
    filename:"/Users/estelle/work/webfile/logger/webexco.log", 

    pattern: '.yyyy-MM-dd',alwaysIncludePattern: true,  
    layout: {
        type: 'pattern',
        pattern: '[%d %p %c] %m%n'
    }  
}), 'webexco'); 

module.exports = {
    getLogger:function() {
        return log4js.getLogger('webexco');
    },  
    dscm:{
        makercenter:{
            addr:'192.168.18.246',
            port:5511
        },
        // makercenter:{
        //     addr:'192.168.3.204',
        //     port:5511
        // },
        shopcenter:{
            addr:'192.168.18.246',
            port:5531
        }
    },
    uploadHost: {
        url: "http://192.168.18.248:8001"
    },
    html:{
        
    }
}