(function ($) {
    var chatCode = {
        SUCC : 0,
        NOLOGIN : 1,
        FAIL : 2,
        SENDSUC : 3,
        SENDERR : 4,
        LEAVING : 5,
        OTHER : 6
    };

    var chatType = {
        ONLINE : 0,    //用户是否在线
        SDCM : 1      //普通消息
    };
    init();
    var socket = io(document.location.origin+'/sdcmnp');
    window.tplObj={
        "rooms":{},
        "chatCode":chatCode,
        "chatType":chatType,
        "socket":socket,
        "tag": "im-laixiangke"
    };

    socket.on('dscm', function (code, type, room, uuid, message, from) {
        if(type == chatType.ONLINE){
            if(code==chatCode.NOLOGIN){
                alert("请登录");
                return;
            } else {
                $('#fromUser').val(from);
            }
        } else if(code == chatCode.SUCC||code == chatCode.LEAVING && type == chatType.SDCM){
            messageObj = JSON.parse(message);
            if(!window.tplObj.rooms[room]){
                window.tplObj.rooms[room]={
                    "from":from
                };
                //渲染对话列表
                var data={
                    "content":messageObj.content,
                    "count":0,
                    "date":Date.now()/1000,
                    "roomId":room,
                    "roomName":"",
                    "userId":from,
                    "userName":messageObj.fromUserName
                };
                var messageBoxHtml = baseView.render("#tpl_msgBox", data);
                $('.J_messageList').prepend(messageBoxHtml);
                var events={
                    'click .J_reply' : 'replay',
                    'click .J_agree' : 'agree',
                    'click .J_deny' : 'deny',
                    'click .J_chatWnd .J_close' : 'hideChatWnd',
                    'click .J_sendMsg' : 'sendMsg'
                };
                baseView.delegateEvents(events);

                //渲染对话窗口
                var data={
                    "msgList":[{
                        "userName":messageObj.fromUserName,
                        "content":messageObj.content
                    }],
                    "userList":[from]
                }
                baseView.render("#tpl_chatWnd", data, '.J_messageList > .m-messageBox[data-roomId="'+room+'"] .J_chatWnd');
                var events={
                    'click .J_chatWnd .J_close' : 'hideChatWnd',
                    'click .J_sendMsg' : 'sendMsg'
                };
                baseView.delegateEvents(events);
                window.tplObj.rooms[room].rendered=true;
            } else {
                //刷新对话列表
                $('.J_messageList > .m-messageBox[data-roomId="'+room+'"] .J_time').html(util.dateFormat(Date.now()/1000,"yyyy-MM-dd hh:mm:ss"));
                var unreadNum = $('.J_messageList > .m-messageBox[data-roomId="'+room+'"] .J_unreadNum').html();
                var messageHtml = messageObj.content+'<span class="num J_unreadNum">'+(parseInt(unreadNum)+1)+'</span>';
                $('.J_messageList > .m-messageBox[data-roomId="'+room+'"] .J_message').html(messageHtml);
                //刷新对话窗口
                if(!window.tplObj.rooms[room].rendered){
                    var data={
                        "msgList":[{
                            "userName":messageObj.fromUserName,
                            "content":messageObj.content
                        }],
                        "userList":[from]
                    }
                    baseView.render("#tpl_chatWnd", data, '.J_messageList > .m-messageBox[data-roomId="'+room+'"] .J_chatWnd');
                    var events={
                        'click .J_chatWnd .J_close' : 'hideChatWnd',
                        'click .J_sendMsg' : 'sendMsg'
                    };
                    baseView.delegateEvents(events);
                    window.tplObj.rooms[room].rendered=true;
                } else {
                    var chatHtml = '<p class="message">'+messageObj.fromUserName+'-'+messageObj.content+'</p>';
                    $('.J_messageList > .m-messageBox[data-roomId="'+room+'"] .J_chatLog').append(chatHtml);
                }
            }
        }
    });

    // function createRoomid(from, to) {
    //     return from < to ? (from + "-" + to) : to + "-" + from;
    // }
    function init(){
        baseModel.get({
            url:"/webrexco/uc/chat/getMessages.cgi",
            data:"",
            success:function(rslt){
                console.log(rslt);
                if(rslt.code!=0){
                    baseModel.errorCode(rslt.code, rslt.message);
                    return;
                }
                $("#fromUserName").val(rslt.userName);
                var messageListHtml = "";
                for(var i=0;i<rslt.data.list.length;i++){
                    messageListHtml += baseView.render("#tpl_msgBox", rslt.data.list[i]);
                    window.tplObj.rooms[rslt.data.list[i].roomId]={opened:false,rendered:false};
                }
                $(".J_messageList").html(messageListHtml);
                //baseView.render("#tpl_msgBox", rslt, ".J_messageList");
                var events={
                    'click .J_reply' : 'replay',
                    'click .J_agree' : 'agree',
                    'click .J_deny' : 'deny',
                    'click .J_chatWnd .J_close' : 'hideChatWnd',
                    'click .J_sendMsg' : 'sendMsg'
                };
                baseView.delegateEvents(events);
            }
        });
    }
    
}(jQuery));
function replay(e){
    console.log("aaa");
    $(".J_messageList .J_chatWnd").hide();
    $(this).parent().siblings(".J_chatWnd").show();
    $(this).parent().siblings(".J_message").find(".J_unreadNum").text("0");
    var roomId = $(this).parent().parent().parent().attr("data-roomId");
    if(!window.tplObj.rooms[roomId].opened){
        window.tplObj.rooms[roomId].opened=true;
        getChatLog(roomId);
    }
    
}
function agree(e){
    var uid = $(this).parent().parent().parent(".m-messageBox").attr("data-uid");
    console.log("agree uid:"+uid);
    baseModel.get({
        "url":"/webrexco/uc/chat/accept.cgi",
        "data":{accept:true,uid:uid},
        "success":function(rslt){
            console.log(rslt);
        }
    });
}
function deny(e){
    var uid = $(this).parent().parent().parent(".m-messageBox").attr("data-uid");
    console.log("deny uid:"+uid);
    baseModel.get({
        "url":"/webrexco/uc/chat/accept.cgi",
        "data":{accept:false,uid:uid},
        "success":function(rslt){
            console.log(rslt);
        }
    });
}
function hideChatWnd(e){
    $(this).parent().parent().hide();
    var roomId = $(this).parent().parent().parent().parent().attr("data-roomId");
    baseModel.get({
        url:"/webrexco/uc/chat/changeStatus.cgi",
        data:{roomId:roomId},
        success:function(rslt){
            console.log(rslt);
        }
    });
}
function sendMsg(e){
    var fromUser = $('#fromUser').val();
    // var toUser = $(this).parent().parent().parents().parent(".m-messageBox").attr("data-uid");
    var toUser = $(this).siblings(".J_toUser").val();
    var room = $(this).parent().parent().parents().parent(".m-messageBox").attr("data-roomId");
    var content = $(this).siblings('.J_msgContent').val();
    $(this).siblings('.J_msgContent').val('');

    if (toUser.length > 0) {
        var uuid = fromUser+Date.now()+Math.random();
        var fromUserName = $("#fromUserName").val();
        var message = {content:content,fromUserName:fromUserName,"toUserName":"ff"};
        window.tplObj.socket.emit('dscm', window.tplObj.tag, toUser, window.tplObj.chatType.SDCM, room, uuid, JSON.stringify(message));
    }
}
function getChatLog(roomId){
    baseModel.get({
        url: "/webrexco/uc/chat/getChatLog.cgi",
        data: {roomId:roomId},
        success: function(rslt){
            console.log(rslt);
            if (rslt.code!=0) {
                baseModel.errorCode(rslt.code, rslt.message);
                return;
            }
            if(!window.tplObj.rooms[roomId].rendered){
                baseView.render("#tpl_chatWnd", rslt.data, '.J_messageList > .m-messageBox[data-roomId="'+roomId+'"] .J_chatWnd');
                var events={
                    'click .J_chatWnd .J_close' : 'hideChatWnd',
                    'click .J_sendMsg' : 'sendMsg'
                };
                baseView.delegateEvents(events);
                var chatHtml = '<p class="sep">-----------以上是历史消息-----------</p>';
                $('.J_messageList > .m-messageBox[data-roomId="'+roomId+'"] .J_chatLog').append(chatHtml);
                window.tplObj.rooms[roomId].rendered=true;
            } else {
                var chatHtml = "";
                for(var j=rslt.data.msgList.length-1;j>=0;j--) {
                    chatHtml += '<p class="message">'+rslt.data.msgList[j].userName+'-'+rslt.data.msgList[j].content+'</p>';
                }
                chatHtml += '<p class="sep">-----------以上是历史消息-----------</p>';
                $('.J_messageList > .m-messageBox[data-roomId="'+roomId+'"] .J_chatLog').prepend(chatHtml);
            }
        }
    });
}