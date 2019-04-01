function initialize(type) {
    var code = util.getQueryString("code");
    var state = util.getQueryString("state");
    if (!code) {
        close();
        return;
    }

    var channel;
    var accessTokenUrl = "/webrexco/oauth/data/";
    var loginUrl = "/webrexco/oauth/data/";
    var getNameUrl = "/webrexco/oauth/data/";

    switch (type) {
        case 1:
            channel = "微信";
            accessTokenUrl += "getWechatAccessToken.cgi";
            loginUrl += "wechatAuthorizationLogin.cgi";
            getNameUrl += "getWechatName.cgi";
            break;
        case 2:
            channel = " QQ ";
            accessTokenUrl += "getQQAccessToken.cgi";
            loginUrl += "qqAuthorizationLogin.cgi";
            getNameUrl += "getQqName.cgi";
            break;
        case 3:
            channel = "微博";
            accessTokenUrl += "getWeiboAccessToken.cgi";
            loginUrl += "weiboAuthorizationLogin.cgi";
            getNameUrl += "getWeiboName.cgi";
            break;
        default:
            return;
    }

    baseModel.get({
        url: accessTokenUrl,
        data: { code: code },
        success: function (rslt) {
            if (rslt.code != 0) {
                baseModel.errorCode(rslt.code, rslt.message);
            } else {
                var openid = rslt.data.openid;
                var accessToken = rslt.data.accessToken;
                login(openid, accessToken);
            }
        }
    });

    function login(openid, accessToken) {
        baseModel.get({
            url: loginUrl,
            data: {
                openid: openid,
                state: state
            },
            success: function (data) {
                if (data.code == 4001) { // 用户不存在
                    getName(openid, accessToken);
                    return;
                }

                if (data.code != 0) {
                    util.tipsModal(2, data.message);
                    return;
                }

                // 已关联账号，直接登录
                back();
            }
        });
    }

    // 获取第三方昵称
    function getName(openid, accessToken) {
        $.ajax({
            url: getNameUrl,
            method: "POST",
            timeout: 10000,
            data: {
                openid: openid,
                access_token: accessToken,
            },
            success: function (data) {
                if (data.code !== 200) {
                    util.tipsModal(2, "系统异常");
                    return;
                }

                bind(openid, data.data);
            },
            error: function () {
                util.tipsModal(2, "系统异常");
            }
        })
    }

    function bind(openid, name) {
        $.ajax({
            url: "/webrexco/oauth/data/bind.cgi", // 检测是否登录，如果已登录则绑定账号
            method: "POST",
            timeout: 10000,
            data: {
                openid: openid,
                type: type,
                name: name
            },
            success: function (data) {
                if (data.code == 401) { // 未登录，跳转到绑定页
                    location.href = "register.htm?openid=" + encodeURIComponent(openid) + "&type=" + type + "&name=" + encodeURIComponent(name);
                    return;
                }

                if (data.code !== 0) {
                    util.tipsModal(2, data.message);
                    return;
                }

                // 已登录，已绑定，返回
                back();
            },
            error: function () {
                util.tipsModal(2, "系统异常");
            }
        });
    }

    function back() {
        opener.login();
        close();
    }
}
