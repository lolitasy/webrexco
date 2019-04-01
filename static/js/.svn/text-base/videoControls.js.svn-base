var flag = false;
var initProgressBar = function(){        //进度条相关操作
    var main_div = $("#wap_video_play_main_div");
    var video = $("video",main_div);
    var timeDrag = false;   /* Drag status */
    $("span[name='progress']",main_div).mousedown(function(e) {     //进度条的按下操作
       timeDrag = true;
       updatebar(e.pageX);
    });
    $(document).mouseup(function(e) {               //松开
       if(timeDrag) {
           timeDrag = false;
           updatebar(e.pageX);
        }
    });
    $(document).mousemove(function(e) {  //鼠标移动事件
        if(timeDrag) {
           updatebar(e.pageX);
        }
    });

    //update Progress Bar control
    var updatebar = function(x) {  //更新时间与播放条进度
        var progress = $("span[name='progress']",main_div);
        var maxduration = video[0].duration; //Video duraiton
        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();
        //Check within range
        if(percentage > 100) {
           percentage = 100;
        }
        if(percentage < 0) {
           percentage = 0;
        }
        //Update progress bar and video currenttime
        $("span b:eq(0)",main_div).css('width', percentage+'%');
        video[0].currentTime = maxduration * percentage / 100;
        if(percentage==100){
            $("a[name='pause'] img",main_div).attr("src","F://pause.png")
        }
    };
    $('u img',main_div).unbind().bind('click', function() {             //控制视频全屏与退出全屏
       //For Webkit
       video[0].webkitEnterFullscreen();

       //For Firefox
       video[0].mozRequestFullScreen();
       video[0].controls=false;
       return false;
    });
}
var initTimeLength = function(timeLength){             //根据秒数格式化时间
    timeLength = parseInt(timeLength);
    var second = timeLength%60;
    var minute = (timeLength-second)/60;
    return (minute<10?"0"+minute:minute)+":"+(second<10?"0"+second:second);
}
var initVideo = function(player){
        flag = true;
        var main_div = $("#wap_video_play_main_div");
    main_div.on("click","a[name='pause']",function(){    //暂停   继续
            var video = $("video",main_div);
            video.css("top","0px")
            video.css("top","50%")
            if(video[0].paused) {
                video[0].play();
        $("img",$(this)).attr("src","F://playing.png")
            }else {
                 video[0].pause();
                 $("img",$(this)).attr("src","F://pause.png")
            }
            return false;
        });
        $("video",main_div).on('loadedmetadata', function() {       //获取全部视频长度
            var video = $("video",main_div);
           $("i:eq(1)",main_div).html(initTimeLength(video[0].duration));
        });
        $("video",main_div).on('timeupdate', function() {           //实时更新播放进度条和时间
            var video = $("video",main_div);
            var currentPos = video[0].currentTime; //Get currenttime    //当前时间
            var maxduration = video[0].duration; //Get video duration   //总时间
            var percentage = 100 * currentPos / maxduration; //in %
            $("i:eq(0)",main_div).html(initTimeLength(video[0].currentTime));
            $("span b:eq(0)",main_div).css("width",percentage+"%")
            $("i:eq(1)",main_div).html(initTimeLength(video[0].duration));
            if(currentPos==maxduration){
                $("a[name='pause'] img",main_div).attr("src","F://pause.png")
            }
        });
        //$("video",main_div)[0].controls=false;
        //$("video",main_div).removeAttr("controls");
        //$("video",main_div).attr("controls",null);           //隐藏控制条
        var startBuffer = function() {                       //预加载视频的
            var video = $("video",main_div);
           var maxduration = video[0].duration;
           var currentBuffer = video[0].buffered.end(0);
           var percentage = 100 * currentBuffer / maxduration;
           $("span b:eq(2)").css('width', percentage+'%');

           if(currentBuffer < maxduration) {
              setTimeout(startBuffer, 500);
           }
        };
//          setTimeout(startBuffer, 500);
        initProgressBar();
}
var setControl = function(){
    initVideo();
//      $("#wap_video_play_main_div video").removeAttr("controls");
//      $(".trump-control-bottom,.trump-control-bottom-flow").hide();
//      $("#trump_main_unique_1 div[data-resize-module='bottom']").closest("div").hide();
}
$(function(){
    var main_div = $("#wap_video_play_main_div");
    main_div.height($(window).height());
    var height = ($(window).width()/16)*9;

    $("video",main_div).height(height).css("margin-top",-(height/2))


    setControl()

});