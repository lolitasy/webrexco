!function () {
    function query(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    $(".userinfo").hide();

    var id = query("id");

    if (!id) {
        $(".subtitle").text("您提交的资料待后台审核，我们将在48个工作时内反馈结果。");
        $("#reload").hide();
        return;
    }

    $.ajax({
        url: "/webrexco/space/result.cgi",
        method: "POST",
        timeout: 10000,
        data: { orderSn: id },
        success: function (data) {
            if (data.code == 401) {
                showIframe("/webrexco/activity/login/login.htm");
                return;
            }

            if (data.code !== 0) {
                util.tipsModal(2, data.message);
                return;
            }

            switch (data.status) {
                case 1:
                    $(".subtitle").text("您的" + name + "黄金会员充值待支付。");
                    $("#home").hide();
                    break;
                case 3:
                    $("#reload").hide();
                    if (id == null) {
                        $(".subtitle").text("您的" + name + "黄金会员充值成功，欢迎成为" + name + "黄金会员。");
                    } else {
                        $(".subtitle").text("您的" + name + "黄金会员充值成功，您提交的资料待后台审核，我们将在48个工作时内反馈结果。");
                    }
                    break;
                case 4:
                    $(".subtitle").text("您的" + name + "黄金会员充值支付失败。");
                    break;
            }
        },
        error: function () {
            util.tipsModal(2, "系统异常");
            $this.removeClass("disabled").text("立即支付");
        }
    });

    $("#reload").click(function () {
        location.reload();
    });
}();
