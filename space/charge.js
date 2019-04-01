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

$("input[type=checkbox], input[type=radio]").change(function () {
    $("input[type=checkbox], input[type=radio]").each(function () {
        $(this).next().toggleClass("checked", this.checked);
    });
});

var id = query("id");

$.ajax({
    url: "/webrexco/space/grade.cgi",
    method: "POST",
    data: { type: type },
    success: function (data) {
        $(".username").text(data.username);

        if (data.code == 401) {
            showIframe("/webrexco/activity/login/login.htm?refresh=1");
            return;
        }

        if (data.code !== 0) {
            util.tipsModal(2, data.message);
            return;
        }

        var grade = null;
        for (var i = 0; i < data.grades.length; i++) {
            var item = data.grades[i];
            if (item.fundCost != 0) {
                grade = item;
                break;
            }
        }

        $("#id").val(id);
        $("#level-value").val(grade.grade);
        $("#level-name").text(grade.description);

        $("#input-type-a, #input-type-b").change(function () {
            if ($("#input-type-a").is(":checked")) {
                $("#input-money-name, .amount").text("￥" + grade.fundCost.toFixed(2));
                $("#input-money-value").val(grade.fundCost);
                $("#input-money-label").text("注入创投基金金额");
                $("#input-money-tip").text("会员资格的取得有赖于将资金入摆渡星空创投基金，到期可提现。");
            } else {
                $("#input-money-name, .amount").text("￥" + grade.moneyCost.toFixed(2));
                $("#input-money-value").val(grade.moneyCost);
                $("#input-money-label").text("缴入会费");
                $("#input-money-tip").text("会员费指实际缴纳给摆渡星空的会费，每年一交，不退换，无收益。");
            }
        }).change();

        $("#submit").click(function () {
            var $this = $(this);
            if ($this.hasClass("disabled"))
                return;

            var payment = $("input[name=payment]:checked").val();
            if (payment == "aliPayDirectPlugin") {
                $("form").submit();
                timeout = setTimeout(function () {
                    util.tipsModal(2, "请求失败，请重试");
                }, 10000);
            } else {
                var form = $("form");
                $.post({
                    url: form.attr("action"),
                    data: form.serialize(),
                    success: function (result) {
                        if (data.code !== 0) {
                            util.tipsModal(2, data.message);
                            return;
                        }

                        orderId = result.payRes.orderSn;
                        var link = result.payRes.code_url;
                        $('.wx-code').qrcode({
                            // render 方式: 'canvas', 'image' or 'div'//用image适配方便
                            render: 'image',
                            // 容错等级: 'L', 'M', 'Q' or 'H'
                            ecLevel: 'L',
                            // 控制canvas 偏移
                            left: 0,
                            top: 0,
                            // 控制二维码尺寸
                            size: 84,
                            // 控制二维码颜色
                            fill: '#000',
                            // background color or image element, null for transparent background
                            background: null,
                            // 二维码内容
                            text: link,
                            // 控制二维码的圆角: 0.0 .. 0.5
                            radius: 0,
                            // 边缘留空，默认0
                            quiet: 0,
                        });
                    }
                })
            }
        });

    },
    error: function () {
        util.tipsModal(2, "系统异常");
    }
});

$(".skip").click(function () {
    if (id == null) {
        history.back();
    } else {
        location.href = "result.htm";
    }
});

$("#go-step-3, .close, .complete").click(function () {
    location.href = "result.htm?id=" + orderId;
});

var timeout;
var orderId;
function setOrderId(err, id) {
    clearTimeout(timeout);
    timeout = null;

    if (err) {
        util.tipsModal(2, err);
        return;
    }

    orderId = id;
    $(".mask").show();
}
