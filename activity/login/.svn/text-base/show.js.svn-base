function showIframe(url){
    $("<div id='loginwp' style='width:370px;height:544px;position:fixed;top:50%;left:50%;margin:-272px 0 0 -135px;z-index:22;'></div>").prependTo('body');
    var if_w = 370; 
    var if_h = 544; 
    $("<iframe width='" + if_w + "' height='" + if_h + "' id='login' name='login' style='border-radius:5px;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").prependTo($('#loginwp'));    
    var st=document.documentElement.scrollTop|| document.body.scrollTop;//滚动条距顶部的距离
    var sl=document.documentElement.scrollLeft|| document.body.scrollLeft;//滚动条距左边的距离
    var ch=document.documentElement.clientHeight;//屏幕的高度
    var cw=document.documentElement.clientWidth;//屏幕的宽度
    var objH=$("#login").height();//浮动对象的高度
    var objW=$("#login").width();//浮动对象的宽度
    var objT=Number(st)+(Number(ch)-Number(objH))/2;
    var objL=Number(sl)+(Number(cw)-Number(objW))/2;
    $("#login").css('left',objL);
    $("#login").css('top',objT);
    $("#login").attr("src", url)
    $("<i id='close' style='position: absolute;width: 16px;height: 16px;display: block;top: 50%;left:50%;background: url(/webrexco/activity/login/img/loginIcon.png) no-repeat -75px 0px;z-index: 44;cursor: pointer;'></i>").prependTo($('#loginwp'));
    var iL=objW-35;
    var iT=10;
    $("#close").css('left',iL);
    $("#close").css('top',iT);
    $("<div id='loginBg' style='background-color: #000;display:block;z-index:20;position:fixed;left:0px;top:0px;bottom:0;right:0px;filter:Alpha(Opacity=50);/* IE */-moz-opacity:0.5;/* Moz + FF */opacity: 0.5; '/>").prependTo('body'); 
    var bgWidth = Math.max($("body").width(),cw);
    var bgHeight = Math.max($("body").height(),ch);
    // $("#loginBg").css({width:bgWidth,height:bgHeight});
    $("#close").click(function() {
        $("#loginwp").remove();
    	$("#close").remove();
        $("#login").remove();
        $("#loginBg").remove();
        window.loginCanceled && window.loginCanceled();
    });
}
