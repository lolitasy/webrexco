
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

function getPage(index, callback) {
    $.ajax({
        url: "/webrexco/uc/data/collection.cgi",
        method: "POST",
        timeout: 10000,
        data: {
            currentPage: index,
            pageSize: 5
        },
        success: function (data) {
            if (data.code !== 0) {
                util.tipsModal(2, data.message);
                return;
            }

            callback(data);
        },
        error: function () {
            util.tipsModal(2, "系统异常");
        }
    });
}

function loadList() {
    getPage(1, function (data) {
        $(".container").html(collection(data));
        if (data.pages) {
            $(".pager").pager(data.pages).on("page", function (e, current) {
                getPage(current, function (data) {
                    $(".container").html(collection(data));
                });
            });
        } else {
            $(".pager").hide();
        }
    });
}
loadList();

$(".container").on("click", ".button", function () {
    var $this = $(this);
    var id = $this.data("id");
    var type = $this.data("type");
    if (type === undefined) {
        $.ajax({
            url: "/webrexco/events/like.cgi",
            method: "POST",
            timeout: 10000,
            data: {
                activityId: id,
                type: 0
            },
            success: function (data) {
                if (data.code == 401) {
                    showIframe("/webrexco/activity/login/login.htm");
                    return;
                }

                if (data.code !== 0) {
                    util.tipsModal(2, data.message);
                    return;
                }

                $this.closest(".article").fadeOut(function () {
                    loadList();
                });
            },
            error: function () {
                util.tipsModal(2, "系统异常");
            }
        });
    } else {
        $.ajax({
            url: "/webrexco/news/data/prizeAndCollect.cgi",
            method: "POST",
            timeout: 10000,
            data: {
                newsId: id,
                type: 0
            },
            success: function (data) {
                if (data.code == 401) {
                    showIframe("/webrexco/activity/login/login.htm");
                    return;
                }

                if (data.code !== 0) {
                    util.tipsModal(2, data.message);
                    return;
                }

                $this.closest(".article").fadeOut(function () {
                    loadList();
                });
            },
            error: function () {
                util.tipsModal(2, "系统异常");
            }
        });
    }
});
