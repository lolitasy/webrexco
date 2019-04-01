(function(){
    $().ready(function(){
        $(".nav-menu>li").click(function(){
            $(this).children().children('.f-con').addClass('u-icon');
            $(this).addClass('isActive');
            $(this).siblings().children().children('.f-con').removeClass('u-icon');
            $(this).siblings().removeClass('isActive');
        });
        $('.u-sigh').mouseenter(function(event) {
            $('.u-sigh-s').css('display',"inline-block");
        });
        $('.u-sigh').mouseleave(function(event) {
             $('.u-sigh-s').hide();
        });
        bannerinit();
        bannerinfo();
    });
   
    function bannerinfo(){
        baseModel.get({
            url:"/webrexco/uc/data/bannerUserInfo.cgi",
            success:function(rslt){
                if(rslt.code==0){
                    $('.userName').html(rslt.user.userName);
                    $('.availMoney').html(util.numFormat(rslt.availMoney,2));//可用余额
                    $('.freezeDeposit').html(util.numFormat(rslt.freezeDeposit,2));//基金冻结
                    if (rslt.user.idealStatus==1&&rslt.user.idealLevel>1) {
                        $('.m-rank-ideal').removeClass('u-idimg').addClass('un-idimg');
                    }//理想主
                    if (rslt.user.ventureStatus==1&&rslt.user.ventureLevel>1) {
                        $('.m-rank-venture').removeClass('u-spimg').addClass('un-spimg');
                    }//星空会
                    if (rslt.msgCount>0) {
                        $('.myMessage').css('display', 'block');
                    }
                    
                    if (rslt.user.bankCardStatus==true) {
                        $('.cashBtn').click(function(){
                            location.href='/webrexco/uc/cash.htm';
                        });
                    }else{
                        $('.cashBtn').click(function(){
                            util.tipsModal(1,"请先绑定银行卡",function(){
                                location.href="/webrexco/uc/account.htm";
                            });
                        });
                    }
                    $('.user-pic').css({
                        'background':'url(http://adtp.cnaidai.com/data/avatar/'+rslt.user.userId+'_avatar_middle.jpg)no-repeat',
                        'background-size':'106px 106px'
                    });
                }else if(rslt.code==401){
                    // var backUrl=location.href;
                    //     location.href='/webrexco/login.htm?backUrl='+encodeURIComponent(backUrl);
                    // return;
                }else{//其他错误
                    errorMsg = rslt.message || "返回数据错误，请刷新重试!";
                    console.log(errorMsg);
                    return;
                }
            }
        });
    }
    function bannerinit(){
        var menuMap=window.tplObj&&window.tplObj.data&&window.tplObj.data.menuMap||{
            "0":0
        };
        var curMenuEle=$(".nav-menu>li").eq(menuMap["0"]);
        curMenuEle.children().children('.f-con').addClass("u-icon");
        curMenuEle.addClass('isActive');
        curMenuEle.siblings().children().children('.f-con').removeClass('u-icon');
        curMenuEle.siblings().removeClass('isActive');
    }
})();