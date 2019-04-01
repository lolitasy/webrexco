$("select").select();

if (typeof FormData === "undefined") {
    util.tipsModal(1, "您的浏览器版本过旧，请使用更新的浏览器", function () {
        history.back();
    }, function () {
        history.back();
    });
}

function step2(id) {
    location.href = "charge.htm?id=" + id;
}

$.ajax({
    url: "/webrexco/" + (type == 0 ? "space" : "ideal") + "/info.cgi",
    method: "POST",
    timeout: 10000,
    success: function (result) {
        $(".avatar").css("background-image", "url(//adtp.cnaidai.com/data/avatar/" + result.userId + "_avatar_middle.jpg)");
        $(".username").text(result.username);

        if (result.code == 401) {
            showIframe("/webrexco/activity/login/login.htm?refresh=1");
            return;
        }

        // 引荐人还未同意你的申请
        if (result.code == 6025) {
            util.tipsModal(1, result.message, function () {
                history.back();
            }, function () {
                history.back();
            });
            return;
        }

        // 未认证
        if (result.code == 4003 || result.code == 4004) {
            util.tipsModal(1, result.message, function () {
                location.href = "/webrexco/uc/account.htm";
            }, function () {
                location.href = "/webrexco/uc/account.htm";
            });
            return;
        }

        // 已申请成功
        if (result.code == 6026 || result.code == 6027) {
            if (result.level == 1) {
                step2();
                return;
            }

            util.tipsModal(1, result.message, function () {
                history.back();
            }, function () {
                history.back();
            });
            return;
        }

        // 已入资
        if (result.code == 6034 || result.code == 6035) {
            util.tipsModal(1, result.message, function () {
                history.back();
            }, function () {
                history.back();
            });
            return;
        }

        // 已填写资料
        if (result.code == 6029) {
            step2(result.applyId);
            return;
        }

        // 审核被拒绝
        if (result.code == 6031 || result.code == 6032) {
            util.tipsModal(1, result.message, function () {
                history.back();
            }, function () {
                history.back();
            });
            return;
        }

        if (result.code != 6036 && result.code !== 0) {
            util.tipsModal(2, result.message);
            return;
        }

        var custom = false;

        // 有保存的资料记录
        if (result.code == 6036) {
            var user = result.owner;
            $("#input-name").val(user.realName);
            $("#input-gender")[0].selectedIndex = user.gender + 1;
            $("#input-company").val(user.companyName);
            $("#input-type")[0].selectedIndex = ["web产品", "app应用", "web和app都有", "公众微信号", "有实体"].indexOf(user.companyType) + 1;

            var index = ["法人/创始人", "合伙人", "总裁", "执行总裁", "董事长", "董事", "CEO", "总经理", "副总经理", "总监"].indexOf(user.position);
            if (index == -1) {
                index = 10;
                custom = true;
            }
            $("#input-position")[0].selectedIndex = index + 1;
            $("#input-position-value").val(user.position);

            $("#input-indroduction").val(user.projectIntroduction);
            $("#input-advantage").val(user.productAdvantage);
            $("#input-target").val(user.targetUser);
            $("#input-team").val(user.teamAdvantage);
        }

        var user = type == 0 ? result.iOwner : result.bOwner;
        if (user) {
            if (user.referer)
                $("#input-referer").attr("readonly", "readonly").val(user.referer);

            $("#input-name").attr("readonly", "readonly").val(user.realName);
            $("#input-gender").attr("readonly", "readonly")[0].selectedIndex = user.gender + 1;
            $("#input-company").attr("readonly", "readonly").val(user.companyName);

            var index = ["法人/创始人", "合伙人", "总裁", "执行总裁", "董事长", "董事", "CEO", "总经理", "副总经理", "总监"].indexOf(user.position);
            if (index == -1) {
                index = 10;
                custom = true;
            }
            $("#input-position").attr("readonly", "readonly")[0].selectedIndex = index + 1;
            $("#input-position-value").attr("readonly", "readonly").val(user.position);
        }

        $("select").each(function () {
            $("#" + $(this).data("id")).remove();
        }).select();

        if (custom)
            $("#input-position-select").addClass("custom");

        $("#input-type").change(function () {
            var $this = $(this);
            var text = $this.children(":selected").text();
            $("#input-type-value").val(text);
        }).change();

        $("#input-position").change(function () {
            var $this = $(this);
            var text = $this.children(":selected").text();
            if (text == "自定义") {
                if ($("#input-position-select").is(".custom"))
                    return;
                $("#input-position-value").val("").change();
                $("#input-position-select").addClass("custom");
            }
            else {
                $("#input-position-value").val(text).change();
                $("#input-position-select").removeClass("custom");
            }
        });

        if (type == 0) {
            $("#input-file").change(function () {
                var fileName = this.value.split('\\').pop();
                if (fileName != "")
                    $("#input-file-name").removeClass("placeholder").text(fileName).attr("title", fileName);
                else
                    $("#input-file-name").addClass("placeholder").text("请上传名片").attr("title", "");
            }).change();

            $("#input-file-2").change(function () {
                var fileName = this.value.split('\\').pop();
                if (fileName != "")
                    $("#input-file-2-name").removeClass("placeholder").text(fileName).attr("title", fileName);
                else
                    $("#input-file-2-name").addClass("placeholder").text("请上传名片反面").attr("title", "");
            }).change();
        } else {
            $("#input-file").change(function () {
                var fileName = this.value.split('\\').pop();
                if (fileName != "")
                    $("#input-file-name").removeClass("placeholder").text(fileName).attr("title", fileName);
                else
                    $("#input-file-name").addClass("placeholder").text("选填，如果有完整的计划书，更能得到投资人青睐").attr("title", "");
            }).change();
        }

        $("input, select, textarea").focus(function () {
            var $this = $(this);
            if (!$this.is("[required]"))
                return;

            var val = $this.val();
            if (val == null || $.trim(val) == "")
                $this.addClass("invalid");
        }).on("input change", function () {
            var $this = $(this);
            var val = $this.val();
            if ($this.is("[required]") &&
                (val == null || $.trim(val) == "")) {
                if ($this.is("select") || $this.is("[type=file]"))
                    $this.data("error", "请选择" + $this.data("name"));
                else
                    $this.data("error", "请填写" + $this.data("name"));
                $this.addClass("invalid");
                return;
            }

            var pattern = $this.attr("pattern");
            if (pattern && !val.match("^" + pattern + "$")) {
                $this.data("error", "请正确填写" + $this.data("name"));
                $this.addClass("invalid");
                return;
            }

            var maxlength = $this.attr("maxlength");
            if (maxlength && val.length > maxlength) {
                $this.data("error", $this.data("name") + "超出长度限制");
                $this.addClass("invalid");
                return;
            }

            var accept = $this.attr("accept");
            if (accept) {
                var list = accept.split(", ");
                var ext = $this.val();
                if (ext != "") {
                    ext = ext.substr(ext.lastIndexOf("."));
                    if (list.indexOf(ext) == -1) {
                        $this.data("error", $this.data("name") + "的文件类型被禁止");
                        $this.addClass("invalid");
                        return;
                    }
                }
            }

            $this.removeClass("invalid");
        });

        $("#submit").click(function () {
            var $this = $(this);
            if ($this.hasClass("disabled"))
                return;

            $("input, select, textarea").change();
            var invalid = $(".invalid");
            if (invalid.length) {
                util.tipsModal(2, invalid.data("error"));
                return;
            }

            $this.addClass("disabled").text("正在提交");

            if (type == 1 && $("#input-file").val() == "") {
                var input = $("#input-file");
                var name = input.attr("name");
                var accept = input.attr("accept");
                var data = input.data("name");

                var next = input.next();
                input.remove();
                next.before($("<input>").attr({ id: "input-file", type: "hidden", name: name, value: "", "data-accept": accept, "data-name": data }));
            }

            var data = new FormData($("form")[0]);
            $.ajax({
                url: "/webrexco/" + (type == 0 ? "space" : "ideal") + "/apply.cfi",
                method: "POST",
                timeout: 10000,
                contentType: false,
                data: data,
                processData: false,
                success: function (data) {
                    if (data.code == 401) {
                        showIframe("/webrexco/activity/login/login.htm");
                        return;
                    }

                    if (data.code == -300000) {
                        if (data.message == "fileerr")
                            util.tipsModal(2, "文件类型被禁止");
                        else
                            util.tipsModal(2, "文件大小超出限制");
                    }

                    if (data.code !== 0) {
                        util.tipsModal(2, data.message);
                        $this.removeClass("disabled").text("下一步");

                        if (type == 1 && $("#input-file").val() == "") {
                            var input = $("#input-file");
                            var name = input.attr("name");
                            var accept = input.data("accept");
                            var data = input.data("name");

                            var next = input.next();
                            input.remove();
                            next.before($("<input>").attr({ id: "input-file", type: "file", accept: accept, name: name, "data-name": data }));
                        }

                        return;
                    }

                    step2(data.applyId);
                },
                error: function () {
                    util.tipsModal(2, "系统异常");
                    $this.removeClass("disabled").text("下一步");
                    if (type == 1 && $("#input-file").val() == "") {
                        var name = $("#input-file").attr("name");
                        $("#input-file").after($("<input>").attr({ id: "input-file", type: "file", accept: "image/*", name: name })).remove();
                    }
                }
            });
        });

        $(".step-1").show();
    },
    error: function () {
        util.tipsModal(2, "系统异常");
    }
});

function loginCanceled() {
    history.back();
}
